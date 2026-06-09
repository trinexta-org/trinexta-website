import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";


export const alt = "À Propos de Trinexta - Une informatique plus simple et humaine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let logoSrc: string | null = null;
  try {
    const logoData = await readFile(
      join(process.cwd(), "public/images/trinexta-logo.png"),
      "base64"
    );
    logoSrc = `data:image/png;base64,${logoData}`;
  } catch {
    
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a233e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
        }}
      >
        {/* Logo */}
        {logoSrc ? (
          <img src={logoSrc} height={48} style={{ objectFit: "contain", objectPosition: "left" }} />
        ) : (
          <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 700 }}>TRINEXTA</div>
        )}

        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            Une informatique plus simple, humaine et utile.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#93b8d4",
              lineHeight: 1.4,
            }}
          >
            Découvrez l'ADN de Trinexta et notre réseau national de 40 experts IT.
          </div>
        </div>

        {/* CTA adapté */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              background: "#ffffff",
              color: "#0a233e",
              fontSize: 20,
              fontWeight: 600,
              padding: "14px 32px",
              borderRadius: "8px",
            }}
          >
            Découvrir notre ADN
          </div>
          <div style={{ color: "#5c92b8", fontSize: 18 }}>
            trinexta.com/a-propos
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}