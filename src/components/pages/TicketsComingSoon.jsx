import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyles from "../common/GlobalStyles";
import Container from "../layout/Container";
import Card from "../common/Card";
import Paragraph from "../common/Paragraph";
import { IMAGES } from "../../assets/image";
import { EVENT } from "../../data/events";
import { COLORS } from "../../theme/colors";
import StageImage from "../../assets/Stage.jpg";
import { useIsNarrow } from "../../hooks/useBreakpoint";

export default function TicketsComingSoon() {
  const isNarrow = useIsNarrow();
  const [ticketsData, setTicketsData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [cart, setCart] = useState({}); // Object with ticket id as key and quantity as value

  const addToCart = (ticket) => {
    // Don't add sold out tickets to cart
    if (ticket.isSoldOut) return;
    
    setCart((prevCart) => {
      const currentQty = prevCart[ticket.id] || 0;
      const maxQuantity = Math.min(5, ticket.availabilityQuantity || 5);
      
      // If this ticket is already in the cart, increment its quantity (max 5)
      if (prevCart[ticket.id]) {
        if (currentQty >= maxQuantity) {
          return prevCart; // Don't increment if already at max
        }
        return {
          [ticket.id]: currentQty + 1,
        };
      }
      // If a different ticket is in the cart, replace it with the new one
      return {
        [ticket.id]: 1,
      };
    });
  };

  const removeFromCart = (ticket) => {
    setCart((prevCart) => {
      const currentQty = prevCart[ticket.id] || 0;
      if (currentQty <= 1) {
        const newCart = { ...prevCart };
        delete newCart[ticket.id];
        return newCart;
      }
      return {
        ...prevCart,
        [ticket.id]: currentQty - 1,
      };
    });
  };

  const getQuantity = (ticketId) => {
    return cart[ticketId] || 0;
  };

  const getTotalPrice = () => {
    return tickets.reduce((total, ticket) => {
      const qty = getQuantity(ticket.id);
      const price = typeof ticket.price === "number" ? ticket.price : parseFloat(ticket.price) || 0;
      return total + (price * qty);
    }, 0);
  };

  const checkoutCart = () => {
    // Placeholder for checkout functionality
    console.log("Checkout", cart);
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
      const infoRaw = pickFirst(item, ["info", "information", "details"]) ?? [];
      const info = Array.isArray(infoRaw)
        ? infoRaw
        : typeof infoRaw === "string"
          ? infoRaw
              .split("\\n")
              .map(item => item.trim().replace(/^-\s*/, ""))
              .filter(Boolean)
          : [];
      const taxIncluded = !!pickFirst(item, ["taxIncluded", "includesTax"]);
      const availabilityQuantity = pickFirst(item, ["availabilityQuantity", "availableQuantity", "quantity", "stock"]) ?? null;
      const isSoldOut = availabilityQuantity !== null && Number(availabilityQuantity) <= 0;
      return {
        id,
        title,
        price: Number.isFinite(rawPrice) ? rawPrice : rawPrice,
        features,
        info,
        taxIncluded,
        availabilityQuantity,
        isSoldOut,
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
      <main style={styles.main}>
        <Container>
          <div style={{ marginBottom: 24, marginTop: 24 }}>
            <h1 style={{ margin: 0, fontSize: 38, letterSpacing: -0.5, color: COLORS.green }}>TICKETS</h1>

          </div>
          {/* Additional details from the API can be shown here */}
          {/* Debug JSON can be toggled if needed */}
          {/* </Card> */}
          {tickets.length > 0 && (
            <div style={{ ...styles.contentWrapper, flexDirection: isNarrow ? "column" : "row" }}>
              <div style={{ ...styles.ticketsColumn, maxWidth: isNarrow ? "100%" : "50%" }}>
                {tickets.map((t) => (
                  <div
                    key={String(t.id)}
                    style={styles.ticketCard}
                  >
                    <div style={styles.ticketCardInner}>
                      <div style={t.isSoldOut ? styles.soldOutContent : {}}>
                        <div style={styles.ticketTitle}>{t.title}</div>
                        <div style={styles.ticketPriceRow}>
                          <div style={styles.priceSection}>
                            <span style={styles.ticketPrice}>
                              ₹{typeof t.price === "number" ? t.price : String(t.price)}
                            </span>
                            <span style={styles.taxNote}>
                              {t.taxIncluded ? "Incl. taxes" : "Excl. taxes"}
                            </span>
                          </div>
                          {!t.isSoldOut && getQuantity(t.id) > 0 ? (
                            <div style={styles.quantityControl}>
                              <button style={styles.minusButton} onClick={() => removeFromCart(t)}>-</button>
                              <span style={styles.quantityDisplay}>{getQuantity(t.id)}</span>
                              <button style={styles.plusButton} onClick={() => addToCart(t)}>+</button>
                            </div>
                          ) : !t.isSoldOut ? (
                            <button style={styles.addButton} onClick={() => addToCart(t)}>+</button>
                          ) : (
                            <div style={styles.soldOutButtonPlaceholder} />
                          )}
                        </div>
                        <div style={styles.divider} />
                        <ul style={styles.featuresList}>
                          {t.info && t.info.length > 0 ? (
                            t.info.map((item, idx) => (
                              <li key={idx} style={styles.featureItem}>
                                {String(item)}
                              </li>
                            ))
                          ) : t.features.length ? (
                            t.features.map((f, idx) => (
                              <li key={idx} style={styles.featureItem}>
                                {String(f)}
                              </li>
                            ))
                          ) : (
                            <li style={styles.featureItem}>Details TBI</li>
                          )}
                        </ul>
                      </div>
                      {t.isSoldOut && (
                        <div style={styles.soldOutButtonWrapper}>
                          <button style={styles.soldOutButton} disabled>SOLD OUT</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {!isNarrow && (
                <div style={{ ...styles.imageColumn, maxWidth: "50%" }}>
                  <img src={StageImage} alt="Stage" style={styles.stageImage} />
                </div>
              )}
            </div>
          )}
          {Object.keys(cart).length > 0 && (
            <div style={styles.totalBar}>
              <div style={styles.totalText}>
                <span style={styles.totalLabel}>Total:</span>
                <span style={styles.totalAmount}>₹{getTotalPrice()}</span>
              </div>
              <button style={styles.proceedButton} onClick={checkoutCart}>Continue</button>
            </div>
          )}

        </Container>
      </main>

    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: COLORS.bg },
  main: { padding: "22px 0 120px" }, // Extra padding for fixed total bar
  contentWrapper: {
    display: "flex",
    gap: 24,
    marginTop: 14,
    alignItems: "flex-start",
  },
  ticketsColumn: {
    flex: 1,
    maxWidth: "50%",
  },
  imageColumn: {
    flex: 1,
    maxWidth: "50%",
    position: "sticky",
    top: 24,
  },
  stageImage: {
    width: "100%",
    height: "auto",
    borderRadius: 14,
    objectFit: "contain",
  },
  ticketCard: {
    padding: 18,
    borderRadius: 14,
    background: COLORS.card,
    border: `1px solid ${COLORS.faint}`,
    marginTop: 12,
    position: "relative",
  },
  ticketCardInner: {
    position: "relative",
  },
  ticketTitle: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: -0.2,
    color: COLORS.text,
    marginBottom: 12,
  },
  ticketPriceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 12,
  },
  priceSection: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  ticketPrice: {
    color: COLORS.green,
    fontWeight: 900,
    fontSize: 34,
    letterSpacing: -0.6
  },
  taxNote: {
    color: COLORS.muted,
    fontSize: 14
  },
  divider: {
    marginTop: 14,
    height: 1,
    background: "rgba(255,255,255,0.08)",
    width: "100%",
  },
  featuresList: {
    margin: "12px 0 0 0",
    paddingLeft: 16,
    listStyle: "none",
  },
  featureItem: {
    marginTop: 8,
    color: "rgba(255,255,255,0.85)",
    fontSize: 16
  },
  addButton: {
    background: COLORS.card,
    border: `1px solid ${COLORS.faint}`,
    borderRadius: 12,
    color: COLORS.green,
    fontSize: 24,
    fontWeight: 700,
    cursor: "pointer",
    padding: "12px 16px",
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: "12px 16px",
    borderRadius: 12,
    border: `2px solid ${COLORS.green}`,
    background: COLORS.bg,
    width: "fit-content",
  },
  minusButton: {
    background: "transparent",
    border: "none",
    color: COLORS.green,
    fontSize: 24,
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    background: "transparent",
    border: "none",
    color: COLORS.green,
    fontSize: 24,
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityDisplay: {
    color: COLORS.green,
    fontSize: 20,
    fontWeight: 700,
    minWidth: 24,
    textAlign: "center",
  },
  totalBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: COLORS.card,
    borderTop: `1px solid ${COLORS.faint}`,
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "20px 20px 0 0",
    zIndex: 1000,
  },
  totalText: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  totalLabel: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: 500,
  },
  totalAmount: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -0.5,
  },
  proceedButton: {
    background: COLORS.green,
    color: COLORS.bg,
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  soldOutContent: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  soldOutButtonPlaceholder: {
    width: 48,
    height: 48,
  },
  soldOutButtonWrapper: {
    position: "absolute",
    right: 18,
    top: 54, // Align with price row (title height + margin + price row position)
    zIndex: 10,
    pointerEvents: "auto",
  },
  soldOutButton: {
    background: COLORS.card,
    border: `1px solid ${COLORS.faint}`,
    borderRadius: 12,
    color: "#FF4444",
    fontSize: 14,
    fontWeight: 700,
    cursor: "not-allowed",
    padding: "12px 20px",
    filter: "none",
    opacity: 1,
  },
};


