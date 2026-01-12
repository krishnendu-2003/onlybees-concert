import React from "react";
import { COLORS } from "../../theme/colors";
import Media, { ImageFallback } from "../common/Media";
import ArtistPhoto from "../../../public/artist_pic.png";

export default function ArtistRow({ photo, name, meta, link }) {
  return (
    <div style={styles.artistRow}>
      <Media
        src={photo || ArtistPhoto}
        alt="Artist photo"
        style={styles.artistPhoto}
        fallback={<ImageFallback label="Artist photo" />}
      />

      <div style={styles.artistInfo}>
        <div style={styles.artistName}>{name}</div>
        <div style={styles.artistMeta}>{meta}</div>
      </div>

      {/* <a href={link} target="_blank" rel="noreferrer" style={styles.artistLink}>
        Wiki
      </a> */}
    </div>
  );
}

const styles = {
  artistRow: { 
    display: "flex", 
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },
  artistPhoto: {
    width: "100%",
    maxWidth: 200,
    height: "auto",
    aspectRatio: "3/4",
    borderRadius: 18,
    objectFit: "cover",
  },
  artistInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  artistName: { 
    fontWeight: 900,
    fontSize: 24,
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  artistMeta: { 
    color: COLORS.muted, 
    fontSize: 14,
    lineHeight: 1.4,
  },
  artistLink: {
    padding: "10px 12px",
    borderRadius: 12,
    border: `1px solid ${COLORS.faint}`,
    background: "rgba(255,255,255,0.03)",
    color: COLORS.muted,
    fontWeight: 800,
  },
};
