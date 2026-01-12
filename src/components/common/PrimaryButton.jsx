import React from "react";
import { COLORS } from "../../theme/colors";
import Media from "./Media";

export default function PrimaryButton({ children, onClick, rightIconSrc }) {
  return (
    <button type="button" onClick={onClick} style={styles.primaryBtn}>
      <span>{children}</span>
      <span style={styles.btnIconWrap}>
        <Media
          src={rightIconSrc}
          alt=""
          style={styles.btnIcon}
          fallback={<span style={styles.btnIconFallback}>↗</span>}
        />
      </span>
    </button>
  );
}

const styles = {
  primaryBtn: {
    marginTop: 12,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 14,
    border: `1px solid rgba(0,255,56,0.45)`,
    background: "rgba(0,255,56,0.12)",
    color: COLORS.text,
    fontWeight: 900,
    cursor: "pointer",
    transition: "transform 120ms ease, filter 120ms ease",
  },
  btnIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,255,56,0.16)",
    border: `1px solid rgba(0,255,56,0.25)`,
  },
  btnIcon: { width: 16, height: 16, objectFit: "contain" },
  btnIconFallback: { fontSize: 16, fontWeight: 900, color: COLORS.green },
};
