import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/horseshoe-orange.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#1e2328",
          color: "#f5efe4",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <img src={logoSrc} alt="" width={260} height={260} style={{ marginRight: 56 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>Workhorse</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 8, color: "#e2582c", marginTop: 12 }}>
            DIGITAL CO.
          </div>
          <div style={{ fontSize: 34, marginTop: 40, color: "#f5efe4", opacity: 0.9 }}>{site.tagline}</div>
          <div style={{ fontSize: 24, marginTop: 16, color: "#f5efe4", opacity: 0.6 }}>
            We build it first. You pay only if you love it.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
