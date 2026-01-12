import React from "react";
import { COLORS } from "../../theme/colors";

const getIcon = (label) => {
  if (label === "Language") {
    return (
      <div style={styles.iconSquare}>
        <span style={styles.iconText}>A</span>
        <span style={styles.iconText}>文</span>
      </div>
    );
  } else if (label === "Duration") {
    return (
      <div style={styles.iconCircle}>
        <span style={styles.clockIcon}>⏱</span>
      </div>
    );
  } else if (label === "Entry Allowed") {
    return (
      <div style={styles.iconRectangle}>
        <span style={styles.ticketIcon}>🎫</span>
      </div>
    );
  }
  return null;
};

export default function InfoTile({ label, value }) {
  return (
    <div style={styles.infoTile}>
      {getIcon(label)}
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>{label}</div>
        <div style={styles.infoValue}>{value}</div>
      </div>
    </div>
  );
}

const styles = {
  infoTile: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 0,
    flex: 1,
  },
  iconSquare: {
    width: 18,
    height: 18,
    background: COLORS.green,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    flexShrink: 0,
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconRectangle: {
    width: 18,
    height: 18,
    background: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconText: {
    color: COLORS.bg,
    fontSize: 5,
    fontWeight: 900,
    lineHeight: 1.2,
  },
  clockIcon: {
    fontSize: 18,
    color: COLORS.bg,
  },
  ticketIcon: {
    fontSize: 18,
    color: COLORS.bg,
  },
  infoContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  infoLabel: { 
    color: COLORS.muted, 
    fontSize: 12, 
    fontWeight: 500 
  },
  infoValue: { 
    fontSize: 16, 
    fontWeight: 900,
    color: COLORS.text,
  },
};
