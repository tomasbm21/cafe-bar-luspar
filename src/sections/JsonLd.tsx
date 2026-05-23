import type { Customer, Day } from "@/content/schema";

const DAY_SCHEMA: Record<Day, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function JsonLd({ customer }: { customer: Customer }) {
  const { business, contact, hours } = customer;

  const openingHours = hours
    .filter(h => !h.closed)
    .map(h => `${DAY_SCHEMA[h.day]} ${h.open}-${h.close}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    description: customer.seo.description,
    url: typeof window !== "undefined" ? window.location.href : "",
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: contact.city,
      postalCode: contact.postalCode,
      addressCountry: contact.country,
    },
    ...(contact.latitude && contact.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: contact.latitude, longitude: contact.longitude } }
      : {}),
    openingHoursSpecification: hours.filter(h => !h.closed).map(h => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAY_SCHEMA[h.day]}`,
      opens: h.open,
      closes: h.close,
    })),
    openingHours,
    ...(customer.socials.instagram ? { sameAs: [customer.socials.instagram] } : {}),
    servesCuisine: business.cuisine,
    priceRange: "€€",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default JsonLd;
