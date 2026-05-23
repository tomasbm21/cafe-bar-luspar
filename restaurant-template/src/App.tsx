import type { Customer } from "@/content/schema";
import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Carta } from "@/sections/Carta";
import { Reservas } from "@/sections/Reservas";
import { Gallery } from "@/sections/Gallery";
import { Contacto } from "@/sections/Contacto";
import { Footer } from "@/sections/Footer";
import { JsonLd } from "@/sections/JsonLd";

export default function App({ customer }: { customer: Customer }) {
  return (
    <div className="min-h-screen bg-bg text-fg antialiased">
      <Nav customer={customer} />
      <main>
        <Hero customer={customer} />
        <Carta customer={customer} />
        <About customer={customer} />
        <Reservas customer={customer} />
        <Gallery customer={customer} />
        <Contacto customer={customer} />
      </main>
      <Footer customer={customer} />
      <JsonLd customer={customer} />
    </div>
  );
}
