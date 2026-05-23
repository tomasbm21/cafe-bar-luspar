import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import customer from "./content/customer.json";
import type { Customer } from "./content/schema";

const c = customer as Customer;

function applyPalette() {
  if (!c.palette) return;
  const root = document.documentElement;
  const map: Array<[keyof NonNullable<Customer["palette"]>, string]> = [
    ["bg", "--bg"],
    ["fg", "--fg"],
    ["primary", "--primary"],
    ["primaryForeground", "--primary-foreground"],
    ["accent", "--accent"],
    ["accentForeground", "--accent-foreground"],
    ["muted", "--muted"],
    ["mutedForeground", "--muted-foreground"],
    ["card", "--card"],
    ["cardForeground", "--card-foreground"],
    ["border", "--border"],
    ["radius", "--radius"],
  ];
  for (const [key, cssVar] of map) {
    const value = c.palette[key];
    if (value) root.style.setProperty(cssVar, value);
  }
}

function applyMeta() {
  document.title = c.seo.title || c.business.name;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", c.seo.description);
  else {
    const m = document.createElement("meta");
    m.name = "description";
    m.content = c.seo.description;
    document.head.appendChild(m);
  }
  document.documentElement.lang = c.tone.language;
}

applyPalette();
applyMeta();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App customer={c} />
  </React.StrictMode>
);
