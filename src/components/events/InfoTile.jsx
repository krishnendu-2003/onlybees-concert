import React from "react";
import { COLORS } from "../../theme/colors";

export default function InfoTile({ label, value }) {
  return (
    <div style={styles.infoTile}>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value}</div>
    </div>
  );
}

const styles = {
  infoTile: {
    padding: 12,
    borderRadius: 14,
    border: `1px solid ${COLORS.faint}`,
    background: "rgba(255,255,255,0.03)",
  },
  infoLabel: { color: COLORS.muted, fontSize: 12, fontWeight: 800 },
  infoValue: { marginTop: 6, fontSize: 14, fontWeight: 800 },
};
