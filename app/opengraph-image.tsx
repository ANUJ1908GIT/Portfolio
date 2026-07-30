import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Anuj Agrawal - Full Stack Developer & UI/UX Designer";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05060a 0%, #0a0e1a 60%, #0d0620 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: "linear-gradient(135deg,#3b82f6,#7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 700,
          }}>A</div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            Portfolio
          </div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, display: "flex" }}>
          Anuj Agrawal
        </div>
        <div style={{ fontSize: 30, marginTop: 24, color: "rgba(255,255,255,0.55)", maxWidth: 900, display: "flex" }}>
          Full Stack Developer &amp; UI/UX Designer
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 50 }}>
          {["Next.js", "React", "TypeScript", "GenAI"].map((tag) => (
            <div key={tag} style={{
              padding: "10px 22px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: 20, color: "rgba(255,255,255,0.6)", display: "flex",
            }}>{tag}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}