import React, { useEffect, useState } from "react";
import GlobalStyles from "../common/GlobalStyles";
import Container from "../layout/Container";
import TopNav from "../layout/TopNav";
import { COLORS } from "../../theme/colors";
import { IMAGES } from "../../assets/image";
import { useIsNarrow } from "../../hooks/useBreakpoint";

export default function CheckoutPage() {
  const isNarrow = useIsNarrow();
  const [cartData, setCartData] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Get cart data from localStorage
    const savedCart = localStorage.getItem("checkoutCart");
    const savedTickets = localStorage.getItem("checkoutTickets");
    
    if (savedCart && savedTickets) {
      setCartData(JSON.parse(savedCart));
      setTickets(JSON.parse(savedTickets));
    } else {
      // No cart data, redirect back
      if (typeof window !== "undefined") {
        window.location.assign("/mohombi-shillong/tickets");
      }
    }
  }, []);

  const getCartItems = () => {
    if (!cartData || !tickets) return [];
    
    return tickets
      .filter(ticket => cartData[ticket.id] > 0)
      .map(ticket => ({
        ...ticket,
        quantity: cartData[ticket.id],
      }));
  };

  const getSubtotal = () => {
    const items = getCartItems();
    return items.reduce((total, item) => {
      const price = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getGST = () => {
    const subtotal = getSubtotal();
    return subtotal * 0.18; // 18% GST
  };

  const getTotal = () => {
    return getSubtotal() + getGST();
  };

  const cartItems = getCartItems();

  if (!cartData || cartItems.length === 0) {
    return null; // Will redirect
  }

  return (
    <div style={styles.page}>
      <GlobalStyles />
      <TopNav logoSrc={IMAGES.brandLogo} />
      <main style={styles.main}>
        <Container>
          <div style={styles.header}>
            <h1 style={styles.title}>Checkout</h1>
          </div>

          <div style={{
            ...styles.contentWrapper,
            flexDirection: isNarrow ? "column" : "row",
          }}>
            {/* Left Column - Order Summary */}
            <div style={{
              ...styles.leftColumn,
              maxWidth: isNarrow ? "100%" : "60%",
            }}>
              <Card style={styles.orderSummaryCard}>
                <h2 style={styles.sectionTitle}>Order Summary</h2>
                
                <div style={styles.itemsList}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={styles.orderItem}>
                      <div style={styles.itemInfo}>
                        <div style={styles.itemName}>{item.title}</div>
                        <div style={styles.itemQuantity}>Qty: {item.quantity}</div>
                      </div>
                      <div style={styles.itemPrice}>
                        ₹{((typeof item.price === "number" ? item.price : parseFloat(item.price) || 0) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.divider} />

                <div style={styles.priceBreakdown}>
                  <div style={styles.priceRow}>
                    <span style={styles.priceLabel}>Subtotal</span>
                    <span style={styles.priceValue}>₹{getSubtotal().toLocaleString()}</span>
                  </div>
                  <div style={styles.priceRow}>
                    <span style={styles.priceLabel}>GST (18%)</span>
                    <span style={styles.priceValue}>₹{getGST().toLocaleString()}</span>
                  </div>
                  <div style={styles.divider} />
                  <div style={styles.priceRow}>
                    <span style={styles.totalLabel}>Total</span>
                    <span style={styles.totalValue}>₹{getTotal().toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Payment Form */}
            {!isNarrow && (
              <div style={{
                ...styles.rightColumn,
                maxWidth: "40%",
              }}>
                <Card style={styles.paymentCard}>
                  <h2 style={styles.sectionTitle}>Payment Details</h2>
                  <p style={styles.comingSoon}>Payment integration coming soon...</p>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}

// Card component (inline since it's used here)
function Card({ children, style }) {
  return (
    <div style={{ ...cardStyles.card, ...(style || {}) }}>
      {children}
    </div>
  );
}

const cardStyles = {
  card: {
    border: `1px solid ${COLORS.faint}`,
    background: COLORS.card,
    borderRadius: 18,
    padding: 24,
  },
};

const styles = {
  page: {
    minHeight: "100vh",
    background: COLORS.bg,
  },
  main: {
    padding: "22px 0 40px",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 38,
    letterSpacing: -0.5,
    color: COLORS.green,
    fontWeight: 900,
  },
  contentWrapper: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 1,
    maxWidth: "60%",
  },
  rightColumn: {
    flex: 1,
    maxWidth: "40%",
  },
  orderSummaryCard: {
    marginBottom: 0,
  },
  paymentCard: {
    marginBottom: 0,
  },
  sectionTitle: {
    margin: "0 0 20px",
    fontSize: 20,
    fontWeight: 900,
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
  },
  itemQuantity: {
    fontSize: 14,
    color: COLORS.muted,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 900,
    color: COLORS.green,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    width: "100%",
    margin: "16px 0",
  },
  priceBreakdown: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.muted,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 900,
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 900,
    color: COLORS.green,
  },
  comingSoon: {
    color: COLORS.muted,
    fontSize: 14,
  },
};

