import React from "react";
import { COLORS } from "../../theme/colors";
import Media, { LogoFallback } from "../common/Media";
import Logo from "../../../public/Logo.svg";

export default function TopNav({ logoSrc, leftText, rightLinks }) {
  return (
    <header style={styles.nav}>
      <div style={styles.navInner}>
        <div style={styles.navLeft}>
          <Media
            src={Logo}
            alt="Brand logo"
            style={styles.logo}
            fallback={<LogoFallback />}
          />
          <span style={styles.navBrandText}>{leftText}</span>
        </div>

        <nav style={styles.navRight} aria-label="Primary">
          {rightLinks?.map((l) => (
            <a key={l.label} href={l.href} style={styles.navLink}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(0, 0, 0, 0.87)",
    backdropFilter: "blur(10px)",
    borderBottom: `1.5px solid ${COLORS.muted}`,
  },
  navInner: {
    maxWidth: 1140,
    margin: "0 auto",
    padding: "10px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  logo: {
    width: 140,
    height: 34,
    objectFit: "contain"
  },
  navBrandText: {
    fontWeight: 700,
    letterSpacing: 0.2,
    color: COLORS.text
  },
  navRight: {
    display: "flex",
    gap: 14,
    alignItems: "center"
  },
  navLink: {
    padding: "8px 10px",
    borderRadius: 10,
    color: COLORS.muted,
    border: `1px solid transparent`,
  },
};
