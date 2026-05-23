import { BlurIn } from '@/components/flash/BlurIn';
import { ParallaxLayer } from '@/components/flash/ParallaxLayer';
import { StaggerList } from '@/components/flash/StaggerList';
import { AnimatedCounter } from '@/components/flash/AnimatedCounter';
import { motion } from 'framer-motion';
import type { Customer } from '@/content/schema';

export function About({ customer }: { customer: Customer }) {
  const { about } = customer;

  return (
    <section id="about" className="relative scroll-mt-24 bg-bg py-24 md:py-32 overflow-hidden">
      {/* Asymmetric editorial header — section number floats left */}
      <div className="container">
        <div className="grid items-end gap-6 md:grid-cols-12 mb-16">
          <div className="md:col-span-2 hidden md:block">
            <p className="font-display text-5xl font-black text-fg/15 tabular-nums leading-none">02.</p>
          </div>
          <div className="md:col-span-7">
            <BlurIn delay={0}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">
                — {about.eyebrow ?? 'Quiénes somos'}
              </p>
            </BlurIn>
            <BlurIn delay={0.05} duration={0.8}>
              <h2
                className="font-display font-black uppercase leading-[0.88] tracking-tight text-fg"
                style={{ fontSize: 'clamp(3.2rem, 7vw, 7.5rem)' }}
              >
                {about.title}
              </h2>
            </BlurIn>
          </div>
          <div className="md:col-span-3">
            <BlurIn delay={0.2}>
              <p className="font-script italic text-fg/55 text-lg md:text-xl leading-snug">
                — {customer.business.cuisine ?? 'Cocina honesta.'}
              </p>
            </BlurIn>
          </div>
        </div>

        {/* Body grid — asymmetric: body text + image side */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Body column */}
          <div className="md:col-span-7 md:col-start-3">
            <BlurIn delay={0.2} duration={0.9}>
              <p className="text-pretty text-base leading-relaxed text-fg/65 md:text-lg">
                {about.body}
              </p>
            </BlurIn>

            {about.chefName && (
              <motion.div
                className="mt-12 flex items-baseline gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="font-script italic text-3xl text-primary">{about.chefName}</span>
                {about.chefRole && (
                  <span className="text-[10px] uppercase tracking-[0.22em] text-fg/40">
                    — {about.chefRole}
                  </span>
                )}
              </motion.div>
            )}
          </div>

          {/* Image column with parallax */}
          {about.image && (
            <div className="md:col-span-5 md:col-start-8 md:row-start-1 relative">
              <ParallaxLayer speed={0.2}>
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={about.image}
                    alt={about.chefName ?? about.title}
                    className="h-full w-full object-cover aspect-[3/4]"
                    loading="lazy"
                  />
                </div>
              </ParallaxLayer>
              {/* Editorial caption under image */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-fg/35 tabular-nums">
                <span>— Fig. 01</span>
                <span>{customer.business.foundedYear ?? '—'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats — editorial numerals */}
        {about.stats && about.stats.length > 0 && (
          <StaggerList
            className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-fg/12 pt-12 md:grid-cols-4"
            stagger={0.1}
          >
            {about.stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col gap-1 relative">
                <span className="absolute -top-8 left-0 text-[9px] font-bold uppercase tracking-[0.22em] text-fg/30 tabular-nums">
                  — {String(i + 1).padStart(2, '0')}
                </span>
                <AnimatedCounter
                  value={stat.value}
                  className="font-display text-5xl font-black text-fg md:text-6xl"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-fg/55">{stat.label}</span>
                {stat.sub && <span className="font-script italic text-fg/40 text-sm">{stat.sub}</span>}
              </div>
            ))}
          </StaggerList>
        )}

        {/* Features — minimal pill row, no sparkles */}
        {customer.features && customer.features.length > 0 && (
          <StaggerList
            className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-fg/12 pt-10"
            stagger={0.05}
          >
            {customer.features.map((f, i) => (
              <div key={f.label} className="flex items-baseline gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-fg/30 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-fg/75">
                  {f.label}
                </span>
              </div>
            ))}
          </StaggerList>
        )}
      </div>
    </section>
  );
}

export default About;
