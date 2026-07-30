"use client";
import { useEffect, useRef } from "react";
import { getHandLandmarker } from "@/utils/mediapipe";
import { classifyStaticGesture } from "@/utils/gestureClassifier";
import type {
  GestureCallbacks, GestureConfig, GestureType, NormalizedLandmark,
} from "@/types/gesture";

interface GestureDetectorProps {
  stream: MediaStream;
  callbacks: GestureCallbacks;
  config?: GestureConfig;
  showPreview?: boolean;
  onGestureChange: (g: GestureType) => void;
  onFatalError: (message: string) => void;
}

const DEFAULT_CONFIG: Required<GestureConfig> = {
  stabilityFrames: 4,
  cooldownMs: 1000,
  minConfidence: 0.6,
};

export function GestureDetector({
  stream, callbacks, config, showPreview = false, onGestureChange, onFatalError,
}: GestureDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const lastFiredAtRef = useRef(0);
  const stableCountRef = useRef<Record<string, number>>({});
  const lastReportedRef = useRef<GestureType>("NONE");

  useEffect(() => {
    let cancelled = false;
    let stopped = false;
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;
    video.play().catch(() => {});

    const report = (g: GestureType) => {
      if (g !== lastReportedRef.current) {
        lastReportedRef.current = g;
        onGestureChange(g);
      }
    };

    const run = async () => {
      let landmarker;
      try {
        landmarker = await getHandLandmarker();
      } catch {
        if (!cancelled) onFatalError("Failed to load hand-tracking model.");
        return;
      }
      if (cancelled) return;

      const processFrame = (landmarks: NormalizedLandmark[]) => {
        const now = performance.now();
        const candidate = classifyStaticGesture(landmarks);

        if (candidate === "NONE") {
          stableCountRef.current = {};
          report("NONE");
          return;
        }

        stableCountRef.current[candidate] = (stableCountRef.current[candidate] ?? 0) + 1;
        const isStable = stableCountRef.current[candidate] >= cfg.stabilityFrames;
        if (!isStable) return;

        report(candidate);

        if (now - lastFiredAtRef.current < cfg.cooldownMs) return;
        lastFiredAtRef.current = now;
        stableCountRef.current = {};

        switch (candidate) {
          case "OPEN_PALM": callbacks.onOpenPalm?.(); break;
          case "FIST": callbacks.onFist?.(); break;
          case "VICTORY": callbacks.onVictory?.(); break;
          case "THUMBS_UP": callbacks.onThumbsUp?.(); break;
        }
      };

      const loop = () => {
        if (stopped) return;
        if (video.readyState >= 2) {
          const result = landmarker.detectForVideo(video, performance.now());
          const landmarks = result.landmarks?.[0] as NormalizedLandmark[] | undefined;
          const confidence = result.handednesses?.[0]?.[0]?.score ?? 0;

          if (landmarks && confidence >= cfg.minConfidence) {
            processFrame(landmarks);
          } else {
            stableCountRef.current = {};
            report("NONE");
          }
        }
        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    };

    run();

    return () => {
      cancelled = true;
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.srcObject = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      style={
        showPreview
          ? {
              position: "fixed", bottom: 16, left: 16, width: 160, height: 120,
              borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)",
              transform: "scaleX(-1)", objectFit: "cover", zIndex: 9998,
            }
          : { position: "fixed", width: 1, height: 1, opacity: 0, pointerEvents: "none" }
      }
    />
  );
}