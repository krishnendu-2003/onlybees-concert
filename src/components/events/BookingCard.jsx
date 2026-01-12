import React from "react";
import { COLORS } from "../../theme/colors";
import Card from "../common/Card";
import Media, { ImageFallback } from "../common/Media";

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
    <div>
      <Media
        src={flyerSrc}
        alt="Event flyer"
        style={styles.flyer}
        fallback={<ImageFallback label="Event Flyer" />}
      />
      <Card style={{ border: "none" }}>
        <style>{`
        .book-now-button:hover {
          opacity: 0.9;
          transform: scale(0.98);
        }
      `}</style>


        <div style={styles.bookingSection}>
          <div style={styles.leftSection}>
            <div style={styles.starting}>{startingLabel}</div>
            <div style={styles.price}>{price}</div>
          </div>
          <button onClick={handleBook} className="book-now-button" style={styles.bookNowButton}>
            <span style={styles.bookNowText}>{cta}</span>
            <span style={styles.bookNowArrow}>▶</span>
          </button>
        </div>
      </Card>
    </div>
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
  bookingSection: {
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
  },
  starting: {
    color: COLORS.text,
    letterSpacing: 1.2,
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
  },
  price: {
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: -0.6,
    color: COLORS.text,
  },
  bookNowButton: {
    background: COLORS.green,
    color: COLORS.bg,
    border: "none",
    borderRadius: 50,
    padding: "18px 64px", 
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 16,
    transition: "opacity 0.2s, transform 0.2s",
    whiteSpace: "nowrap",
  },
  bookNowText: {
    fontWeight: 900,
  },
  bookNowArrow: {
    fontSize: 10,
    display: "inline-block",
    lineHeight: 1,
  },
};
