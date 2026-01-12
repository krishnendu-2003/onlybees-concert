import React from "react";
import { COLORS } from "../../theme/colors";

export default function Paragraph({ children }) {
  return <p style={styles.p}>{children}</p>;
}

const styles = {
  p: { margin: "10px 0", color: COLORS.muted, lineHeight: 1.65 },
};
