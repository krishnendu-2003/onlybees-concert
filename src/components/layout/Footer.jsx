import React from "react";
import { COLORS } from "../../theme/colors";
import Container from "./Container";
import Media, { LogoFallback } from "../common/Media";
import Logo from "../../../public/Logo.svg";

export default function Footer({
  id,
  logoSrc,
  columns,
  legalLinks,
  copyright,
  socialIcons,
}) {
  return (
    <footer id={id} style={styles.footer}>
      <Container>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <Media
              src={Logo}
              alt="Brand logo"
              style={styles.footerLogo}
              fallback={<LogoFallback />}
            />
          </div>
          <div style={styles.footerCols}>
            {columns?.map((c) => (
              <div key={c.title} style={styles.footerCol}>
                <div style={styles.footerColTitle}>{c.title}</div>
                <div style={styles.footerLinks}>
                  {c.links?.map((l) => (
                    <a key={l.label} href={l.href} style={styles.footerLink}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.legalRow}>
            {legalLinks?.map((l) => (
              <a key={l.label} href={l.href} style={styles.legalLink}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={styles.copy}>{copyright}</div>
        </div>
      </Container>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: 30,
    borderTop: `1px solid ${COLORS.faint}`,
    background: "rgba(0,0,0,0.15)",
    padding: "26px 0",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 18,
    alignItems: "start",
  },
  footerBrand: {

  },
  footerLogo: {
    width: 200,
    height: 200, objectFit: "contain"
  },
  footerBrandText: {
    marginTop: 10,
    color: COLORS.muted,
    lineHeight: 1.5
  },

  socialRow: {
    display: "flex",
    gap: 10,
    marginTop: 12
  },
  socialBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    border: `1px solid ${COLORS.faint}`,
    background: "rgba(255,255,255,0.03)",
    display: "grid",
    placeItems: "center",
  },
  socialIcon: {
    width: 16,
    height: 16,
    objectFit: "contain"
  },
  socialFallback: {
    color: COLORS.muted,
    fontWeight: 900
  },

  footerCols: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
  },
  footerColTitle: {
    fontWeight: 900,
    marginBottom: 10
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  footerLink: {
    color: COLORS.muted
  },

  footerBottom: {
    marginTop: 18,
    paddingTop: 16,
    borderTop: `1px solid ${COLORS.faint}`,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  legalRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap"
  },
  legalLink: {
    color: COLORS.muted,
    fontWeight: 700,
    fontSize: 13
  },
  copy: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 13
  },
};