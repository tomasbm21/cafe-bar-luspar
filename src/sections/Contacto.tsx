import { Clock, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlurIn } from '@/components/flash/BlurIn';
import { SplitText } from '@/components/flash/SplitText';
import { StaggerList } from '@/components/flash/StaggerList';
import { FadeIn } from '@/components/flash/FadeIn';
import type { Customer, Day } from '@/content/schema';

const DAY_LABELS: Record<Day, string> = {
  Mon: 'Lunes',
  Tue: 'Martes',
  Wed: 'Miércoles',
  Thu: 'Jueves',
  Fri: 'Viernes',
  Sat: 'Sábado',
  Sun: 'Domingo',
};
const DAY_ORDER: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function Contacto({ customer }: { customer: Customer }) {
  const sorted = [...customer.hours].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  );

  return (
    <section id="contacto" className="relative scroll-mt-24 bg-bg py-28 md:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative">
        {/* Big editorial headline — asymmetric, with section number */}
        <div className="grid items-end gap-6 md:grid-cols-12 mb-20">
          <div className="md:col-span-2 hidden md:block">
            <p className="font-display text-5xl font-black text-fg/15 tabular-nums leading-none">05.</p>
          </div>
          <div className="md:col-span-7">
            {customer.contacto?.eyebrow && (
              <BlurIn delay={0}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">
                  — {customer.contacto.eyebrow}
                </p>
              </BlurIn>
            )}
            <h2
              className="font-display font-black leading-[0.88] tracking-tight text-fg uppercase"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}
            >
              <SplitText
                text={customer.contacto?.title ?? 'Dónde estamos.'}
                stagger={0.025}
                delay={0.05}
                by="char"
              />
            </h2>
          </div>
          <div className="md:col-span-3">
            {customer.contacto?.body && (
              <BlurIn delay={0.3}>
                <p className="font-script italic text-fg/55 text-lg md:text-xl leading-snug">
                  — {customer.contacto.body}
                </p>
              </BlurIn>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Info card */}
          <FadeIn className="lg:col-span-4">
            <div className="h-full rounded-2xl border border-border/40 bg-card p-8">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-fg">
                <MapPin className="h-4 w-4 text-primary" />
                Dónde estamos
              </h3>
              <address className="mt-4 not-italic text-sm text-muted-foreground leading-relaxed">
                {customer.contact.address}<br />
                {customer.contact.postalCode ? `${customer.contact.postalCode} ` : ''}
                {customer.contact.city}<br />
                {customer.contact.country}
              </address>

              <div className="my-6 h-px bg-border/30" />

              <StaggerList className="space-y-3" stagger={0.08}>
                {customer.contact.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <a className="text-muted-foreground hover:text-primary transition-colors" href={`tel:${customer.contact.phone.replace(/\s+/g, '')}`}>
                      {customer.contact.phone}
                    </a>
                  </div>
                )}
                {customer.contact.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <a className="text-muted-foreground hover:text-primary transition-colors" href={`mailto:${customer.contact.email}`}>
                      {customer.contact.email}
                    </a>
                  </div>
                )}
              </StaggerList>

              <div className="my-6 h-px bg-border/30" />

              <h4 className="flex items-center gap-2 font-display text-base font-bold text-fg">
                <Clock className="h-4 w-4 text-primary" />
                Horario
              </h4>
              <ul className="mt-4 space-y-2.5">
                {sorted.map((h, i) => (
                  <motion.li
                    key={h.day}
                    className="flex items-start justify-between gap-4 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <span className="capitalize text-fg/60">{DAY_LABELS[h.day]}</span>
                    <div className="text-right">
                      <span className={`tabular-nums ${h.closed ? 'text-muted-foreground/40' : 'text-muted-foreground'}`}>
                        {h.closed ? 'Cerrado' : `${h.open} – ${h.close}`}
                      </span>
                      {h.note && <p className="text-[10px] text-muted-foreground/40 mt-0.5">{h.note}</p>}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Map */}
          <FadeIn delay={0.1} className="lg:col-span-8">
            <div className="h-full min-h-[28rem] overflow-hidden rounded-2xl border border-border/30 bg-card shadow-xl shadow-black/25">
              {customer.contact.googleMapsEmbed ? (
                <iframe
                  title={`Mapa ${customer.business.name}`}
                  src={customer.contact.googleMapsEmbed}
                  className="h-full min-h-[28rem] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ filter: 'invert(90%) hue-rotate(180deg) grayscale(20%)' }}
                />
              ) : (
                <div className="flex h-full min-h-[28rem] flex-col items-center justify-center p-12 text-center text-muted-foreground">
                  <MapPin className="mb-3 h-12 w-12 opacity-20" />
                  <p className="text-sm">Mapa no disponible</p>
                  {customer.contact.googleMapsUrl && (
                    <a href={customer.contact.googleMapsUrl} className="mt-4 text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      Ver en Google Maps →
                    </a>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
