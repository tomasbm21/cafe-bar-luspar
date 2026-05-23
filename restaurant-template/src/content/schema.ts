export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface CustomerHours {
  day: Day;
  open: string;
  close: string;
  closed?: boolean;
  note?: string;
}

export interface MenuDish {
  name: string;
  description?: string;
  price?: string;
  allergens?: string;
  tag?: "signature" | "nuevo" | "vegano" | "sin gluten" | "temporada";
}

export interface MenuCategory {
  name: string;
  description?: string;
  dishes: MenuDish[];
}

export interface CustomerPalette {
  primary?: string;
  primaryForeground?: string;
  accent?: string;
  accentForeground?: string;
  bg?: string;
  fg?: string;
  muted?: string;
  mutedForeground?: string;
  card?: string;
  cardForeground?: string;
  border?: string;
  radius?: string;
}

export interface Customer {
  business: {
    name: string;
    slug: string;
    tagline?: string;
    category: "restaurant" | "cafe" | "bar" | "taberna";
    foundedYear?: number;
    cuisine?: string;
  };
  contact: {
    phone?: string;
    email?: string;
    address: string;
    city: string;
    postalCode?: string;
    country: string;
    googleMapsUrl?: string;
    googleMapsEmbed?: string;
    latitude?: number;
    longitude?: number;
  };
  hours: CustomerHours[];
  socials: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
  tone: {
    keywords: string[];
    language: "es" | "en";
  };
  palette?: CustomerPalette;
  marquee?: string[];
  hero: {
    eyebrow?: string;
    headline: string;
    headlineAccent?: string;
    subheadline?: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    image: string;
  };
  about: {
    eyebrow?: string;
    title: string;
    body: string;
    image?: string;
    chefName?: string;
    chefRole?: string;
    chefSignatureUrl?: string;
    stats?: { value: string; label: string; sub?: string }[];
  };
  carta?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    categories?: MenuCategory[];
    pdfUrl?: string;
    pdfLabel?: string;
  };
  reservas?: {
    enabled: boolean;
    eyebrow?: string;
    title?: string;
    body?: string;
    phone?: string;
    url?: string;
    note?: string;
    image?: string;
  };
  features?: {
    icon: string;
    label: string;
  }[];
  gallery: string[];
  contacto?: {
    eyebrow?: string;
    title?: string;
    body?: string;
  };
  seo: {
    title: string;
    description: string;
  };
}
