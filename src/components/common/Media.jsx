import React from "react";
import { COLORS } from "../../theme/colors";

export function LogoFallback() {
  return (
    <div style={styles.logoFallback}>
      <span style={{ fontWeight: 700, letterSpacing: 0.6 }}>OB</span>
    </div>
  );
}

export function ImageFallback({ label }) {
  return (
    <div style={styles.imageFallback}>
      <div style={styles.imageFallbackInner}>
        <div style={styles.imageFallbackTitle}>{label}</div>
        <div style={styles.imageFallbackSub}>Add your image in IMAGES.*</div>
      </div>
    </div>
  );
}

export default function Media({ src, alt, style, fallback }) {
  if (!src) return fallback || null;
  return <img src={src} alt={alt} style={style} />;
}

const styles = {
  logoFallback: {
    width: 34,
    height: 34,
    borderRadius: 12,
    border: `1px solid ${COLORS.faint}`,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.04)",
  },
  imageFallback: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    border: `1px solid ${COLORS.faint}`,
    background:
      "linear-gradient(135deg, rgba(0,255,56,0.12), rgba(255,255,255,0.04))",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: 16,
  },
  imageFallbackInner: { maxWidth: 260 },
  imageFallbackTitle: { fontWeight: 900, letterSpacing: 0.2 },
  imageFallbackSub: { color: COLORS.muted, marginTop: 6, fontSize: 13 },
};
