import React from "react";
import { COLORS } from "../../theme/colors";

export default function Card({ children, style }) {
  return (
    <section style={{ ...styles.card, ...(style || {}) }}>
      {children}
    </section>
  );
}

const styles = {
  card: {
    border: `1px solid ${COLORS.faint}`,
    background: COLORS.card,
    borderRadius: 18,
    padding: 16,
  },
};
