import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Customer } from '@/content/schema';

export function Hero({ customer }: { customer: Customer }) {
  const name = customer.business.name.toUpperCase();
  const infoItems = customer.marquee && customer.marquee.length > 0
    ? customer.marquee.slice(0, 5)
    : ['Cocina del día', customer.business.cuisine ?? 'Cocina de autor', 'Reserva tu mesa'];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-bg">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={customer.hero.image}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Heavier vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/20" />
        <div className="absolute inset-0 grain opacity-50 mix-blend-overlay" />
      </div>

      {/* Top-right edition stamp — Cafe Matin editorial detail */}
      <motion.div
        className="absolute top-20 right-6 z-20 hidden md:flex flex-col items-end gap-1 text-fg/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.22em]">{customer.contact.city}</span>
        <span className="text-[9px] uppercase tracking-[0.22em] tabular-nums">
          {customer.business.foundedYear ? `Est. ${customer.business.foundedYear}` : 'Editorial No. 01'}
        </span>
      </motion.div>

      {/* Top-left address coordinates — editorial detail */}
      <motion.div
        className="absolute top-20 left-6 z-20 hidden md:flex flex-col gap-1 text-fg/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.22em]">— {customer.business.category}</span>
        {customer.contact.latitude && customer.contact.longitude && (
          <span className="text-[9px] uppercase tracking-[0.22em] tabular-nums">
            {customer.contact.latitude.toFixed(3)}° N  {Math.abs(customer.contact.longitude).toFixed(3)}° W
          </span>
        )}
      </motion.div>

      {/* MAIN: title block centered vertically, info strip below */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Top spacer */}
        <div className="h-32 md:h-36" />

        {/* GIANT TITLE BLOCK */}
        <div className="container flex-1 flex flex-col justify-center">
          <motion.h1
            className="font-display font-black leading-[0.82] tracking-[-0.02em] text-fg uppercase"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 17rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {name}
          </motion.h1>

          {/* Headline subtitle — smaller, italic script accent */}
          {(customer.hero.headline || customer.hero.headlineAccent) && (
            <motion.p
              className="mt-4 max-w-2xl font-display text-lg leading-snug text-fg/55 md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="italic font-light">{customer.hero.headline}</span>
              {customer.hero.headlineAccent && (
                <span className="ml-2 font-script italic text-primary">— {customer.hero.headlineAccent}</span>
              )}
            </motion.p>
          )}
        </div>

        {/* INFO STRIP — Cafe Matin solid hairline rules */}
        <motion.div
          className="border-t border-fg/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <div className="container">
            <div className="grid grid-cols-2 gap-0 sm:grid-cols-3 lg:flex lg:items-stretch lg:divide-x lg:divide-fg/15">
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="px-5 py-4 flex flex-col gap-1 lg:flex-1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.95 + i * 0.06 }}
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-fg/35 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg/75 leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom strip: tagline left / CTA right */}
        <div className="border-t border-fg/15">
          <div className="container">
            <div className="flex items-center justify-between gap-4 py-5">
              <motion.p
                className="max-w-md text-xs leading-snug text-fg/50 md:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {customer.hero.subheadline ?? customer.business.tagline ?? customer.business.cuisine}
              </motion.p>

              <motion.a
                href={customer.hero.ctaHref}
                className="flex items-center gap-2 text-sm font-semibold text-fg/65 hover:text-fg transition-colors group shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <span className="text-[11px] uppercase tracking-[0.18em]">{customer.hero.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
