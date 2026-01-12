import React from "react";

export default function Container({ children }) {
  return <div style={styles.container}>{children}</div>;
}

const styles = {
  container: { maxWidth: 1140, margin: "0 auto", padding: "0 18px" },
};
