import React from "react";
import { COLORS } from "../../theme/colors";

export default function TabBar({ tabs, activeTab, onChange}) {
    return (
        <div style={styles.tabBar} role="tablist" aria-label="Event sections">
            {
                tabs.map((t) => {
                    const isActive = t === activeTab;
                    return (
                        <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(t)}
                        style={{ ...styles.tab, ...(isActive ? styles.tabActive : {}) }}
                        >
                            {t}
                        </button>
                    );
                })
            }
        </div>
    );
}

const styles = {
    tabBar: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 16,
    },
    tab: {
      appearance: "none",
      border: `1px solid ${COLORS.faint}`,
      background: "rgba(255,255,255,0.03)",
      color: COLORS.muted,
      padding: "10px 12px",
      borderRadius: 999,
      fontSize: 13,
      cursor: "pointer",
      transition: "transform 120ms ease, border 120ms ease, color 120ms ease",
    },
    tabActive: {
      border: `1px solid rgba(0,255,56,0.55)`,
      color: COLORS.text,
      boxShadow: "0 0 0 3px rgba(0,255,56,0.10) inset",
    },
  };