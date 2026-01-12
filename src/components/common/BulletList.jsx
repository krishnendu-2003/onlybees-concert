import React from "react";
import { COLORS } from "../../theme/colors";

export default function BulletList({ items }) {
  return (
    <ul style={styles.ul}>
      {items.map((it) => (
        <li key={it} style={styles.li}>
          <span style={styles.bulletIcon}>•</span>
          <span style={styles.liText}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  ul: { margin: "10px 0 0", padding: 0, listStyle: "none" },
  li: { display: "flex", gap: 10, margin: "8px 0", color: COLORS.muted },
  bulletIcon: { color: COLORS.green, fontWeight: 900, lineHeight: 1.1 },
  liText: { lineHeight: 1.5 },
};
