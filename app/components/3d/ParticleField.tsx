"use client";
import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    let cancelled = false; // guards against the async import resolving after unmount
    let disposeFn: (() => void) | undefined;

    const init = async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch (err) {
        console.error("ParticleField: failed to load three.js", err);
        return;
      }

      // Component may have unmounted (or this effect re-run) while we were
      // awaiting the import - bail out before touching the canvas/GPU so we
      // never leave a second, undisposed WebGL context + rAF loop running.
      if (cancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch (err) {
        console.error("ParticleField: WebGL context creation failed", err);
        return;
      }

      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = 3;

      const N = 2500;
      const FIELD_DEPTH = 20;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);

      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * FIELD_DEPTH;
        const t = Math.random();
        if (t < 0.33) { col[i*3]=0.23; col[i*3+1]=0.51; col[i*3+2]=0.96; }
        else if (t < 0.66) { col[i*3]=0.65; col[i*3+1]=0.55; col[i*3+2]=0.98; }
        else { col[i*3]=0.13; col[i*3+1]=0.83; col[i*3+2]=0.93; }
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // Another safety check: if we got cancelled during the (synchronous)
      // setup above there's nothing async to race, but keep this here in
      // case future edits add awaits before this point.
      if (cancelled) {
        renderer.dispose();
        return;
      }

      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.5;
        my = (e.clientY / window.innerHeight - 0.5) * 0.5;
      };
      document.addEventListener("mousemove", onMouse);

      let lastScrollY = window.scrollY;
      let scrollVelocity = 0;
      let scrollProgress = 0;
      const onScroll = () => {
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - doc.clientHeight;
        const y = window.scrollY;
        scrollVelocity += (y - lastScrollY) * 0.0006;
        scrollProgress = maxScroll > 0 ? y / maxScroll : 0;
        lastScrollY = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const positionAttr = geo.getAttribute("position") as InstanceType<typeof THREE.BufferAttribute>;
      const posArray = positionAttr.array as Float32Array;
      let t = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.001;

        particles.rotation.x += (my * 0.5 - particles.rotation.x) * 0.05;
        particles.rotation.y += (mx * 0.5 - particles.rotation.y) * 0.05;
        particles.rotation.z = t * 0.05;

        scrollVelocity *= 0.92;

        const speed = scrollVelocity + 0.004;
        for (let i = 0; i < N; i++) {
          const zi = i * 3 + 2;
          let z = posArray[zi];
          z += speed;
          if (z > camera.position.z + 1) {
            z -= FIELD_DEPTH;
          } else if (z < camera.position.z - FIELD_DEPTH - 1) {
            z += FIELD_DEPTH;
          }
          posArray[zi] = z;
        }
        positionAttr.needsUpdate = true;

        camera.position.z = 3 - scrollProgress * 0.6;

        renderer.render(scene, camera);
      };
      animate();

      disposeFn = () => {
        document.removeEventListener("mousemove", onMouse);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    };

    init();

    return () => {
      cancelled = true;
      disposeFn?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}