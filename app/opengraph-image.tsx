import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Pervaiz Medical Group — A Day of Breath";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0E1512",
          color: "#F6F1E7",
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative frame */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            right: "30px",
            bottom: "30px",
            border: "1px solid rgba(246, 241, 231, 0.12)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "4px",
              color: "#C86B4A",
              textTransform: "uppercase",
            }}
          >
            Clinical Medicine & Sleep
          </span>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "2px",
              color: "rgba(246, 241, 231, 0.5)",
            }}
          >
            [ Est. 2024 ]
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "400",
              lineHeight: "1.08",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Pervaiz Medical Group
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "rgba(246, 241, 231, 0.75)",
              maxWidth: "800px",
              lineHeight: "1.4",
              fontFamily: "sans-serif",
              margin: 0,
            }}
          >
            Pulmonary, sleep, and restorative primary care. Medicine that pauses to
            measure what others rush past.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(246, 241, 231, 0.15)",
            paddingTop: "24px",
            fontSize: "14px",
            fontFamily: "monospace",
            color: "rgba(246, 241, 231, 0.6)",
          }}
        >
          <span>Internal Medicine · Pulmonology · Sleep Medicine</span>
          <span>pervaizmedical.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
