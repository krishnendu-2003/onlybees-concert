import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyles from "../common/GlobalStyles";
import Container from "../layout/Container";
import TopNav from "../layout/TopNav";
import Footer from "../layout/Footer";
import Card from "../common/Card";
import Paragraph from "../common/Paragraph";
import { IMAGES } from "../../assets/image";
import { EVENT } from "../../data/events";
import { COLORS } from "../../theme/colors";

export default function TicketsComingSoon() {
    
  const [ticketsData, setTicketsData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (ticket) => {
    setCart([...cart, ticket]);
  };

  const removeFromCart = (ticket) => {
    setCart(cart.filter((t) => t.id !== ticket.id));
  };
  // getting data from the api using axios
  // using axios to get the data from the api

  const pickFirst = (obj, keys) => {
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null) return obj[key];
    }
    return undefined;
  };

  const findFirstArrayOfObjects = (data) => {
    if (Array.isArray(data)) {
      return data.every((x) => typeof x === "object") ? data : [];
    }
    if (data && typeof data === "object") {
      for (const value of Object.values(data)) {
        if (Array.isArray(value) && value.some((x) => typeof x === "object")) {
          return value;
        }
      }
    }
    return [];
  };

  const normalizeTickets = (data) => {
    const array = findFirstArrayOfObjects(data);
    return array.map((item) => {
      const id =
        pickFirst(item, ["id", "sectionId", "_id", "uuid", "code"]) ??
        Math.random().toString(36).slice(2);
      const title =
        pickFirst(item, ["name", "title", "label", "sectionName"]) ??
        `Section ${id}`;
      const rawPrice =
        pickFirst(item, ["price", "amount", "rate", "fare", "basePrice"]) ?? 0;
      const featuresRaw =
        pickFirst(item, ["features", "perks", "highlights", "bullets"]) ?? [];
      const features = Array.isArray(featuresRaw)
        ? featuresRaw
        : typeof featuresRaw === "string"
        ? featuresRaw.split(/[.|•\-]\s+/).filter(Boolean)
        : [];
      const taxIncluded = !!pickFirst(item, ["taxIncluded", "includesTax"]);
      return {
        id,
        title,
        price: Number.isFinite(rawPrice) ? rawPrice : rawPrice,
        features,
        taxIncluded,
      };
    });
  };

  const extractIdsFromResponse = (data) => {
    const ids = [];
    const getIdFromObject = (obj) => {
      if (!obj || typeof obj !== "object") return null;
      if (Object.prototype.hasOwnProperty.call(obj, "id")) return obj.id;
      // Try to find any key that looks like an id
      const idKey = Object.keys(obj).find((k) => {
        const lower = k.toLowerCase();
        return lower === "id" || lower.endsWith("id") || lower.endsWith("_id");
      });
      return idKey ? obj[idKey] : null;
    };
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (typeof item !== "object") {
          ids.push(item);
        } else {
          const val = getIdFromObject(item);
          if (val !== null && val !== undefined) ids.push(val);
        }
      });
      return ids;
    }
    if (data && typeof data === "object") {
      // Look for the first array of objects that contains id-like fields
      for (const value of Object.values(data)) {
        if (Array.isArray(value)) {
          const arrIds = [];
          value.forEach((item) => {
            if (typeof item !== "object") {
              arrIds.push(item);
            } else {
              const val = getIdFromObject(item);
              if (val !== null && val !== undefined) arrIds.push(val);
            }
          });
          if (arrIds.length) return arrIds;
        }
      }
    }
    return ids;
  };

  const fetchTicketsData = async () => {
    try {
      const response = await axios.get("/api/sections/availability");
      setTicketsData(response.data);
      setTicketIds(extractIdsFromResponse(response.data));
      setTickets(normalizeTickets(response.data));
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  useEffect(() => {
    fetchTicketsData();
  }, []);
  return (
    <div style={styles.page}>
      <GlobalStyles />
      <TopNav logoSrc={IMAGES.brandLogo} />
      <main style={styles.main}>
        <Container>
          <Card style={{ padding: 28, textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: 38, letterSpacing: -0.5 }}>Coming up</h1>
            <Paragraph>Ticket booking for Mohombi Shillong is coming soon. Stay tuned!</Paragraph>
            {/* Additional details from the API can be shown here */}
            {/* Debug JSON can be toggled if needed */}
          </Card>
          {tickets.length > 0 && (
            <div style={{ marginTop: 14 }}>
              {tickets.map((t) => (
                <div key={String(t.id)} style={styles.ticketCard}>
                  <div style={styles.ticketHeaderRow}>
                    <div style={styles.ticketTitle}>{t.title}</div>
                    <div style={styles.ticketId}>ID: {String(t.id)}</div>
                  </div>
                  <div style={styles.ticketPriceRow}>
                    <span style={styles.ticketPrice}>
                      ₹{typeof t.price === "number" ? t.price : String(t.price)}
                    </span>
                    <span style={styles.taxNote}>
                      {t.taxIncluded ? "Incl. taxes" : "Excl. taxes"}
                    </span>
                  </div>
                  <div style={styles.divider} />
                  <ul style={styles.featuresList}>
                    {t.features.length ? (
                      t.features.map((f, idx) => (
                        <li key={idx} style={styles.featureItem}>
                          {String(f)}
                        </li>
                      ))
                    ) : (
                      <li style={styles.featureItem}>Details TBI</li>
                    )}
                  </ul>
                  //a plus button to add the ticket to the cart
                  <button style={styles.addButton} onClick={() => addToCart(t)}>+</button>
                  {/* // number count of the ticket in the cart */}
                  <span style={styles.cartCount}>{cart.find((t) => t.id === t.id)?.count || 0}</span>
                  {/* // a minus button to remove the ticket from the cart */}
                  <button style={styles.removeButton} onClick={() => removeFromCart(t)}>-</button>
                  {/* // total price of the ticket in the cart */}
                  <span style={styles.cartTotal}>{cart.find((t) => t.id === t.id)?.price || 0}</span>
                  {/* // a checkout button to checkout the cart */}
                  <button style={styles.checkoutButton} onClick={() => checkoutCart()}>Checkout</button>
                </div>
              ))}
            </div>
          )}
        
        </Container>
      </main>
     
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: COLORS.bg },
  main: { padding: "22px 0 40px" },
  ticketCard: {
    padding: 18,
    borderRadius: 14,
    background: COLORS.card,
    border: `1px solid ${COLORS.faint}`,
    marginTop: 12,
  },
  ticketHeaderRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
  },
  ticketTitle: { fontSize: 22, fontWeight: 900, letterSpacing: -0.2 },
  ticketId: { color: COLORS.muted, fontSize: 12 },
  ticketPriceRow: { display: "flex", alignItems: "center", gap: 10, marginTop: 12 },
  ticketPrice: { color: COLORS.green, fontWeight: 900, fontSize: 34, letterSpacing: -0.6 },
  taxNote: { color: COLORS.muted, fontSize: 14 },
  divider: {
    marginTop: 14,
    height: 1,
    background: "rgba(255,255,255,0.08)",
    width: "100%",
  },
  featuresList: { margin: 12, paddingLeft: 16 },
  featureItem: { marginTop: 8, color: "rgba(255,255,255,0.85)", fontSize: 16 },
  idBox: {
    padding: "10px 12px",
    borderRadius: 12,
    border: `1px solid ${COLORS.faint}`,
    background: "rgba(255,255,255,0.03)",
    textAlign: "left",
    marginTop: 8,
    fontWeight: 700,
  },
};


