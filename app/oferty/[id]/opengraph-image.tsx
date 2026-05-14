import { ImageResponse } from "next/og";
import { getOfferById } from "@/lib/esti/store";
import { formatPrice, formatArea, typeLabel } from "@/lib/esti/format";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const alt = "Oferta nieruchomości";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OfferOgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await getOfferById(id);

  const title = offer?.title || "Oferta nieruchomości";
  const price = offer ? formatPrice(offer.price) : "";
  const city = offer?.city || "Trójmiasto";
  const district = offer?.district || "";
  const area = offer ? formatArea(offer.area) : "";
  const type = offer ? typeLabel(offer) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #1A2E14 0%, #2D4A1F 60%, #3F6629 100%)",
          color: "#F5F2EB",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px 70px",
          justifyContent: "space-between",
        }}
      >
        {/* Top: branding */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "#A3C733",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "#0A1A03",
            }}
          >
            S&B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
              Starnawska & Boleńska
            </span>
            <span style={{ fontSize: 13, letterSpacing: 4, opacity: 0.7 }}>
              NIERUCHOMOŚCI
            </span>
          </div>
        </div>

        {/* Środek: typ + tytuł */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {type && (
            <span
              style={{
                alignSelf: "flex-start",
                background: "#A3C733",
                color: "#0A1A03",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 2,
                padding: "8px 18px",
                borderRadius: 999,
                textTransform: "uppercase",
              }}
            >
              {type}
            </span>
          )}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.2,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            {title.length > 90 ? title.slice(0, 88) + "…" : title}
          </h1>
        </div>

        {/* Dół: cena + lokalizacja + powierzchnia */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {price && (
              <span style={{ fontSize: 48, fontWeight: 800, color: "#A3C733", letterSpacing: -0.5 }}>
                {price}
              </span>
            )}
            <div style={{ display: "flex", gap: 18, fontSize: 22, opacity: 0.85 }}>
              {area && <span>{area}</span>}
              {city && <span>·</span>}
              {city && (
                <span>
                  {city}
                  {district ? `, ${district}` : ""}
                </span>
              )}
            </div>
          </div>
          <span style={{ fontSize: 18, opacity: 0.6 }}>{siteConfig.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
