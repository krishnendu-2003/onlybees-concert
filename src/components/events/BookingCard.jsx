import React from "react";
import { COLORS } from "../../theme/colors";
import Card from "../common/Card";
import Media, { ImageFallback } from "../common/Media";
import PrimaryButton from "../common/PrimaryButton";



export default function BookingCard({
  flyerSrc,
  startingLabel,
  price,
  cta,
  arrowSrc,
  onBook,
}) {
  // on clicking on the cta button, redirect to the tickets coming soon page
  const handleBook = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/mohombi-shillong/tickets");
    }
  };
  return (
    <Card>
      <Media
        src={flyerSrc}
        alt="Event flyer"
        style={styles.flyer}
        fallback={<ImageFallback label="Event Flyer" />}
      />

      <div style={{ marginTop: 14 }}>
        <div style={styles.starting}>{startingLabel}</div>
        <div style={styles.price}>{price}</div>

        <PrimaryButton onClick={handleBook} rightIconSrc={arrowSrc}>
          {cta}
        </PrimaryButton>

        <div style={styles.bookHint}>
          Sticky booking on desktop = fewer “I’ll do it later” lies.
        </div>
      </div>
    </Card>
  );
}

const styles = {
  flyer: {
    width: "100%",
    height: "100%",
    // borderRadius: 14,
    // objectFit: "cover",
    // border: `1px solid ${COLORS.faint}`,
    // background: "rgba(255,255,255,0.03)",
  },
  starting: {
    color: COLORS.muted,
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: 800,
  },
  price: {
    marginTop: 6,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: -0.6,
  },
  bookHint: {
    marginTop: 10,
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    lineHeight: 1.4,
  },
};
