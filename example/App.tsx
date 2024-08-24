import { useState } from "react";

import SpinningNumbers from "../lib/main";

const button = {
  cursor: "pointer",
  borderRadius: "0.375rem",
  border: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  outline: "none",
  transition: "all 0.2s ease-in-out",
  fontWeight: 500,
  fontSize: "1rem",
  width: "12rem",
};

const primary = {
  ...button,
  backgroundColor: "#6366F1",
  color: "white",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  ":hover": {
    backgroundOpacity: 0.95,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  },
};

const secondary = {
  ...button,
  backgroundColor: "rgba(99, 102, 241, 0.2)",
  color: "#4F46E5",
  ":hover": {
    backgroundOpacity: 0.25,
  },
};

const currencies = [
  { locale: "en-US", currency: "USD", name: "United States" },
  { locale: "de-DE", currency: "EUR", name: "German" },
  { locale: "en-GB", currency: "GBP", name: "United Kingdom" },
  { locale: "ru-RU", currency: "RUB", name: "Russia" },
];

const prices = [1483.0, 439.99, 14.5, 2.39];

export default function Home() {
  const [currency, setCurrency] = useState(currencies[0].currency);
  const [locale, setLocale] = useState(currencies[0].locale);
  const [price, setPrice] = useState(prices[0]);

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <SpinningNumbers
        fontSize={8}
        style={{
          fontWeight: "bold",
          letterSpacing: "-0.2rem",
        }}
      >
        {formatter.format(price)}
      </SpinningNumbers>
      <div style={{ marginTop: "4rem", display: "flex", gap: "1rem" }}>
        {prices.map((value, index) => (
          <button
            key={index}
            onClick={() => setPrice(value)}
            style={value === price ? primary : secondary}
          >
            {formatter.format(value)}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "4rem", display: "flex", gap: "1rem" }}>
        {currencies.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setLocale(item.locale);
              setCurrency(item.currency);
            }}
            style={item.locale == locale ? primary : secondary}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
