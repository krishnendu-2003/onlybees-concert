import React from "react";
import { COLORS } from "../../theme/colors";

export default function EmptyState({ title, body }) {
  return (
    <div style={styles.empty}>
      <div style={styles.emptyTitle}>{title}</div>
      <div style={styles.emptyBody}>{body}</div>
    </div>
  );
}

const styles = {
  empty: {
    padding: 14,
    borderRadius: 14,
    background: "rgba(255,255,255,0.03)",
    border: `1px dashed ${COLORS.faint}`,
  },
  emptyTitle: { fontWeight: 800, marginBottom: 6 },
  emptyBody: { color: COLORS.muted, lineHeight: 1.6 },
};
