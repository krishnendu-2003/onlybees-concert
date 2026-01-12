import React, { useMemo, useState } from "react";

import { COLORS } from "./theme/colors";
import { IMAGES } from "./assets/image";
import { EVENT } from "./data/events";
import { useIsNarrow } from "./hooks/useBreakpoint";

import GlobalStyles from "./components/common/GlobalStyles";
import Container from "./components/layout/Container";
import TopNav from "./components/layout/TopNav";
import Footer from "./components/layout/Footer";

import Card from "./components/common/Card";
import TabBar from "./components/common/TabBar";
import Paragraph from "./components/common/Paragraph";
import BulletList from "./components/common/BulletList";
// import EmptyState from "./components/common/EmptyState";
import EmptyState from "./components/common/EmptyState";

import BookingCard from "./components/events/BookingCard";
import InfoTile from "./components/events/InfoTile";
import ArtistRow from "./components/events/ArtistRow";
import MohombiFlyer from "../public/mohombi_flyer.jpg";
import Stage from "../public/Stage.jpg";
import Media from "./components/common/Media";
import TicketsComingSoon from "./components/pages/TicketsComingSoon";

export default function App() {
  const [activeTab, setActiveTab] = useState(EVENT.tabs[0]);
  const isNarrow = useIsNarrow(980);

  const tabContent = useMemo(() => {
    if (activeTab === "About") {
      return (
        <>
          <Paragraph>{EVENT.about.description}</Paragraph>
          <div style={styles.subtleTitle}>Highlights:</div>
          <BulletList items={EVENT.about.highlights} />
          <Paragraph>{EVENT.about.closing}</Paragraph>
        </>
      );
    } else if (activeTab === "Venue Layout") {
      return (
        <>
          <div style={styles.venueLayoutImageContainer}>
            <Media src={Stage} alt="Venue Layout" style={styles.venueLayoutImage} />
          </div>
        </>

      )
    } else if (activeTab === "Terms and Conditions") {
      return (
        <>
          <div style={styles.subtleTitle}>1. Ticket Validity</div>
          <BulletList
            items={[
              "Each ticket admits one person only.",
              "Entry is valid only on the date and time mentioned on the ticket.",
              "Tickets are non-transferable and non-refundable, unless the event is cancelled.",
            ]}
          />
          <div style={styles.subtleTitle}>2. Entry & ID Requirements</div>
          <BulletList
            items={[
              "Attendees must carry a valid government-issued photo ID (Aadhar, Passport, Driving License, etc.).",
              "The name on the ticket must match the ID for entry.",
            ]}
          />
        </>
      )
    } else if (activeTab === "FAQ") {
      return (
        <>
          <div style={styles.subtleTitle}>Q: Can I get a refund if I can't attend?</div>
          <Paragraph>
            A: All ticket sales are final and non-refundable, unless the event is
            cancelled by the organisers. No refunds for no-shows or change of plans.
          </Paragraph>

          <div style={styles.subtleTitle}>Q: Can I transfer my ticket to someone else?</div>
          <Paragraph>
            A: Tickets are non-transferable. Entry will be granted only to the
            original ticket holder with a matching valid photo ID.
          </Paragraph>

          <div style={styles.subtleTitle}>Q: What ID do I need to bring?</div>
          <Paragraph>
            A: Please bring a valid government-issued photo ID (Aadhaar, PAN,
            Driving License).
          </Paragraph>
        </>
      )
    }

    return (
      <EmptyState
        title={`${activeTab}`}
        body="Drop your content here when ready. UI stays clean meanwhile."
      />
    );
  }, [activeTab]);

  const handleBook = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/mohombi-shillong/tickets");
    }
  };

  // Simple route-less page render for the tickets URL
  if (typeof window !== "undefined" && window.location.pathname === "/mohombi-shillong/tickets") {
    return <TicketsComingSoon />;
  }

  return (
    <div style={styles.page}>
      <GlobalStyles />

      <TopNav
        logoSrc={IMAGES.brandLogo}
      />

      <main style={styles.main}>
        <Container>
          <div
            style={{
              ...styles.hero,
              gridTemplateColumns: isNarrow ? "1fr" : "1.45fr 0.85fr",
            }}
          >
            {/* LEFT */}
            <div>
              <div style={styles.kicker}>
                <span style={styles.kickerPill} />
                <span style={styles.kickerText}>{EVENT.topLocationLine}</span>
              </div>

              <h1 style={styles.h1}>{EVENT.title}</h1>

              <div style={styles.dateRow}>
                <span style={styles.dateText}>{EVENT.dateLine}</span>
              </div>

              <div style={styles.cityRow}>
                <span style={styles.dot} />
                <span style={styles.cityText}>{EVENT.city}</span>
              </div>

              <TabBar tabs={EVENT.tabs} activeTab={activeTab} onChange={setActiveTab} />

              <Card style={{ marginTop: 14 }}>{tabContent}</Card>
            </div>

            {/* RIGHT */}
            <div>
              <BookingCard
                flyerSrc={MohombiFlyer}
                startingLabel={EVENT.startingLabel}
                price={EVENT.startingPrice}
                cta={EVENT.cta}
                arrowSrc={IMAGES.arrow}
                onBook={handleBook}
              />

              <Card style={{ marginTop: 14 }}>
                <h2 style={styles.sectionTitle}>Event Guide</h2>
                <div style={styles.infoGrid}>
                  {EVENT.guide.map((row) => (
                    <InfoTile key={row.label} label={row.label} value={row.value} />
                  ))}
                </div>
              </Card>

              <Card style={{ marginTop: 14 }}>
                <h2 style={styles.sectionTitle}>Artist</h2>
                <ArtistRow
                  name={EVENT.artist.name}
                  meta={EVENT.artist.meta}
                  link={EVENT.artist.link}
                />
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <Footer
        id="footer"
        logoSrc={IMAGES.brandLogo}
        columns={EVENT.footer.columns}
        legalLinks={EVENT.footer.legalLinks}
        copyright={EVENT.footer.copyright}
        socialIcons={[IMAGES.social1, IMAGES.social2, IMAGES.social3, IMAGES.social4]}
      />
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: COLORS.bg },
  main: { padding: "22px 0 40px" },

  hero: {
    display: "grid",
    gap: 18,
    alignItems: "start",
  },

  kicker: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: COLORS.muted,
    marginBottom: 10,
  },
  kickerPill: {
    width: 10,
    height: 10,
    borderRadius: 99,
    background: COLORS.green,
    boxShadow: `0 0 22px rgba(0,255,56,0.35)`,
  },
  kickerText: { fontSize: 14 },

  h1: { margin: 0, fontSize: 44, lineHeight: 1.05, letterSpacing: -0.6 },

  dateRow: { marginTop: 10 },
  dateText: { color: COLORS.green, fontWeight: 800, fontSize: 14 },

  cityRow: { display: "flex", alignItems: "center", gap: 10, marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 99, background: "rgba(255,255,255,0.35)" },
  cityText: { color: COLORS.muted, fontSize: 14 },

  sectionTitle: { margin: "0 0 12px", fontSize: 16, letterSpacing: 0.2 },
  subtleTitle: { marginTop: 12, color: COLORS.muted, fontWeight: 700 },

  infoGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
  venueLayoutImage: {
    width: "50%",
    height: "10%",
  },
  venueLayoutImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgb(255, 255, 255)",
  },
};
