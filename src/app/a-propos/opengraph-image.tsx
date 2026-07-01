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
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logoSrc ? (
          <img src={logoSrc} width={1000} style={{ objectFit: "contain" }} />
        ) : (
          <div style={{ color: "#0a233e", fontSize: 72, fontWeight: 700 }}>TRINEXTA</div>
        )}
      </div>
    ),
    { ...size }
  );
}