import { Instagram, Facebook, MessageCircle, Music, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/flash/Marquee';
import { BlurIn } from '@/components/flash/BlurIn';
import { TextReveal } from '@/components/flash/TextReveal';
import CircularText from '@/components/flash/CircularText';
import { MagneticButton } from '@/components/flash/MagneticButton';
import type { Customer } from '@/content/schema';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: MessageCircle,
  tiktok: Music,
  twitter: Twitter,
  youtube: Youtube,
};

export function Footer({ customer }: { customer: Customer }) {
  const year = new Date().getFullYear();
  const socials = Object.entries(customer.socials).filter(([, v]) => Boolean(v));

  return (
    <footer className="relative overflow-hidden bg-muted/30 border-t border-border/30">
      {/* MASSIVE editorial name — Cafe Matin style */}
      <div className="relative border-b border-border/20 py-12 md:py-20 overflow-hidden">
        <TextReveal delay={0}>
          <p
            className="font-display font-black text-fg/8 uppercase leading-none tracking-tighter whitespace-nowrap"
            style={{ fontSize: 'clamp(5rem, 18vw, 22rem)' }}
          >
            {customer.business.name}
          </p>
        </TextReveal>

        {/* Spinning badge centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <CircularText
              text={`${customer.business.cuisine ?? 'Restaurante'} — ${customer.business.name} — `}
              spinDuration={18}
              onHover="slowDown"
              className="text-fg/35 pointer-events-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-4 w-4 rounded-full bg-primary/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-b border-border/20 overflow-hidden bg-primary/5">
        <div className="py-3">
          <Marquee
            items={Array(8).fill(`${customer.business.name} — ${customer.business.cuisine ?? ''}`)}
            className="text-primary/30"
            itemClassName="font-display text-sm font-bold uppercase tracking-[0.12em]"
          />
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <BlurIn delay={0} className="md:col-span-4">
            <p className="font-display text-2xl font-bold text-fg">{customer.business.name}</p>
            {customer.business.tagline && (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{customer.business.tagline}</p>
            )}
            {customer.business.cuisine && (
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-primary/60">{customer.business.cuisine}</p>
            )}
          </BlurIn>

          <BlurIn delay={0.05} className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">Visítanos</p>
            <address className="not-italic text-sm leading-relaxed text-fg/55">
              {customer.contact.address}<br />
              {customer.contact.postalCode ? `${customer.contact.postalCode} ` : ''}
              {customer.contact.city}<br />
              {customer.contact.country}
            </address>
          </BlurIn>

          <BlurIn delay={0.1} className="md:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">Contacto</p>
            <ul className="space-y-2 text-sm text-fg/55">
              {customer.contact.phone && (
                <li>
                  <a href={`tel:${customer.contact.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                    {customer.contact.phone}
                  </a>
                </li>
              )}
              {customer.contact.email && (
                <li>
                  <a href={`mailto:${customer.contact.email}`} className="hover:text-primary transition-colors">
                    {customer.contact.email}
                  </a>
                </li>
              )}
            </ul>
          </BlurIn>

          <BlurIn delay={0.15} className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">Síguenos</p>
            <div className="flex flex-wrap gap-2">
              {socials.map(([name, href]) => {
                const Icon = socialIcons[name] ?? Instagram;
                return (
                  <MagneticButton key={name} strength={0.4}>
                    <a
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 text-fg/45 transition-all hover:border-primary/40 hover:text-primary"
                      aria-label={name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </MagneticButton>
                );
              })}
            </div>
          </BlurIn>
        </div>

        <motion.div
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/20 pt-8 text-[11px] text-fg/25 sm:flex-row sm:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>© {year} {customer.business.name}. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-6">
            <li><a href="#" className="hover:text-fg/50 transition-colors">Aviso legal</a></li>
            <li><a href="#" className="hover:text-fg/50 transition-colors">Cookies</a></li>
            <li><a href="#" className="hover:text-fg/50 transition-colors">Privacidad</a></li>
          </ul>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
