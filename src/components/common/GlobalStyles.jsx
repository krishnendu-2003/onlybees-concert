import React from "react";
import { COLORS } from "../../theme/colors";

export default function GlobalStyles() {
  return (
    <style>
      {`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          background: ${COLORS.bg};
          color: ${COLORS.text};
        }
        a { color: inherit; text-decoration: none; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${COLORS.green};
          outline-offset: 3px;
          border-radius: 10px;
        }
      `}
    </style>
  );
}
