import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.name;

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "70px 80px",
          background:
            "radial-gradient(ellipse at top right, rgba(163,199,51,0.25), transparent 50%), radial-gradient(ellipse at bottom left, rgba(45,74,31,0.55), transparent 60%), #0a0a0a",
          color: "#fafaf7",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "#a3c733",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#a3c733",
            }}
          />
          Biuro nieruchomości w Gdyni · od {siteConfig.foundedYear}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Starnawska
            <span style={{ color: "#a3c733" }}> & </span>
            Boleńska
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a3a3a3",
              fontStyle: "italic",
              fontWeight: 300,
              maxWidth: 900,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #262626",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 22,
            }}
          >
            <span style={{ color: "#fafaf7" }}>{siteConfig.address.full}</span>
            <span style={{ color: "#a3a3a3" }}>
              {siteConfig.contact.phones[0].displayValue} ·{" "}
              {siteConfig.contact.phones[1].displayValue}
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a3c733",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            starnawska.pl
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
