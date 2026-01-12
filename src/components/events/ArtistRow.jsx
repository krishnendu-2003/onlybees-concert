import React from "react";
import { COLORS } from "../../theme/colors";

export default function ArtistRow({ name, meta, link }) {
  return (
    <div style={styles.artistRow}>
      <div style={styles.artistAvatar}>
        <span style={{ fontWeight: 800, color: COLORS.green }}>
          {name?.slice(0, 1)?.toUpperCase() || "A"}
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <div style={styles.artistName}>{name}</div>
        <div style={styles.artistMeta}>{meta}</div>
      </div>

      <a href={link} target="_blank" rel="noreferrer" style={styles.artistLink}>
        Wiki
      </a>
    </div>
  );
}

const styles = {
  artistRow: { display: "flex", alignItems: "center", gap: 12 },
  artistAvatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    border: `1px solid rgba(0,255,56,0.35)`,
    background: "rgba(0,255,56,0.10)",
    display: "grid",
    placeItems: "center",
  },
  artistName: { fontWeight: 900 },
  artistMeta: { marginTop: 3, color: COLORS.muted, fontSize: 13 },
  artistLink: {
    padding: "10px 12px",
    borderRadius: 12,
    border: `1px solid ${COLORS.faint}`,
    background: "rgba(255,255,255,0.03)",
    color: COLORS.muted,
    fontWeight: 800,
  },
};
