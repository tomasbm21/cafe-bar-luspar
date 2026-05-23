import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { BlurIn } from '@/components/flash/BlurIn';
import { StaggerList } from '@/components/flash/StaggerList';
import { MagneticButton } from '@/components/flash/MagneticButton';
import FlowingMenu from '@/components/flash/FlowingMenu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Customer } from '@/content/schema';

const TAG_LABELS: Record<string, string> = {
  signature: 'Firma',
  nuevo: 'Nuevo',
  vegano: 'Vegano',
  'sin gluten': 'Sin gluten',
  temporada: 'Temporada',
};

const TAG_VARIANT: Record<string, 'amber' | 'accent' | 'outline' | 'secondary'> = {
  signature: 'amber',
  nuevo: 'accent',
  vegano: 'outline',
  'sin gluten': 'secondary',
  temporada: 'outline',
};

// Fallback food images cycling through gallery for menu category previews
const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76594e8cef1?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=900&auto=format&fit=crop',
];

export function Carta({ customer }: { customer: Customer }) {
  const carta = customer.carta;
  if (!carta || (!carta.categories?.length && !carta.pdfUrl)) return null;

  const categories = carta.categories ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  const flowItems = categories.map((cat, i) => ({
    link: `#carta-cat-${i}`,
    text: cat.name,
    image: customer.gallery[i] ?? FALLBACK_IMGS[i % FALLBACK_IMGS.length],
  }));

  return (
    <section id="carta" className="relative scroll-mt-24 bg-bg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-fg/12" />

      {/* Header — asymmetric */}
      <div className="container py-20 md:py-28">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-2 hidden md:block">
            <p className="font-display text-5xl font-black text-fg/15 tabular-nums leading-none">01.</p>
          </div>
          <div className="md:col-span-6">
            <BlurIn delay={0}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">— {carta.eyebrow ?? 'La carta'}</p>
            </BlurIn>
            <BlurIn delay={0.05} duration={0.8}>
              <h2
                className="font-display font-black uppercase leading-[0.88] tracking-tight text-fg"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}
              >
                {carta.title ?? 'Nuestra carta.'}
              </h2>
            </BlurIn>
            {carta.intro && (
              <BlurIn delay={0.2}>
                <p className="mt-5 max-w-md font-script italic text-fg/55 text-lg md:text-xl leading-snug">{carta.intro}</p>
              </BlurIn>
            )}
          </div>
          <div className="md:col-span-4 md:text-right">
            {carta.pdfUrl && (
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="rounded-full border-fg/20 bg-transparent">
                  <a href={carta.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {carta.pdfLabel ?? 'PDF'}
                  </a>
                </Button>
              </MagneticButton>
            )}
            <BlurIn delay={0.3} className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-fg/35 tabular-nums">
                {categories.length.toString().padStart(2, '0')} secciones · {categories.reduce((acc, c) => acc + c.dishes.length, 0)} platos
              </p>
            </BlurIn>
          </div>
        </div>
      </div>

      {/* FlowingMenu — category browser with hover marquee */}
      {flowItems.length > 0 && (
        <BlurIn delay={0.1} className="relative w-full border-y border-fg/12" duration={0.7}>
          <div style={{ height: `${Math.max(280, flowItems.length * 80)}px` }}>
            <FlowingMenu
              items={flowItems}
              speed={20}
              textColor="#FAEED4"
              bgColor="hsl(20 20% 9%)"
              marqueeBgColor="hsl(38 80% 58%)"
              marqueeTextColor="hsl(20 20% 7%)"
              borderColor="hsl(20 15% 22%)"
            />
          </div>
        </BlurIn>
      )}

      {/* Detailed dishes — single column editorial flow, no tabs anymore */}
      <div className="container py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Sticky category picker */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 flex flex-col gap-1">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-fg/35">— Filtrar</p>
              {categories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveIndex(i)}
                  className={`text-left px-3 py-2.5 -mx-3 border-l-2 transition-all cursor-pointer ${
                    i === activeIndex
                      ? 'border-primary text-fg font-medium'
                      : 'border-transparent text-fg/50 hover:text-fg/80 hover:border-fg/20'
                  }`}
                >
                  <span className="font-display text-base">{cat.name}</span>
                  <span className="ml-2 text-[9px] font-bold uppercase tracking-[0.2em] text-fg/30 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active category dishes */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.name}
                  id={`carta-cat-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline gap-6 mb-10 pb-6 border-b border-fg/12">
                    <span className="font-display text-6xl font-black text-fg/15 tabular-nums leading-none">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-fg uppercase tracking-tight">{active.name}</h3>
                      {active.description && (
                        <p className="mt-2 font-script italic text-fg/55 text-lg">{active.description}</p>
                      )}
                    </div>
                  </div>

                  <StaggerList stagger={0.06} delay={0.05}>
                    {active.dishes.map((dish, di) => (
                      <div
                        key={dish.name}
                        className="grid grid-cols-12 gap-4 items-start py-5 border-b border-fg/8 last:border-0 group"
                      >
                        <span className="col-span-1 text-[10px] font-bold uppercase tracking-[0.2em] text-fg/30 tabular-nums pt-1">
                          {String(di + 1).padStart(2, '0')}
                        </span>
                        <div className="col-span-8">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <p className="font-display text-xl font-semibold text-fg group-hover:text-primary transition-colors">{dish.name}</p>
                            {dish.tag && (
                              <Badge variant={TAG_VARIANT[dish.tag] ?? 'outline'} className="text-[9px]">
                                {TAG_LABELS[dish.tag] ?? dish.tag}
                              </Badge>
                            )}
                          </div>
                          {dish.description && (
                            <p className="mt-1 text-sm leading-relaxed text-fg/55">{dish.description}</p>
                          )}
                          {dish.allergens && (
                            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-fg/30">{dish.allergens}</p>
                          )}
                        </div>
                        <div className="col-span-3 text-right">
                          {dish.price && (
                            <span className="font-display text-xl font-bold text-fg tabular-nums">{dish.price}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </StaggerList>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-fg/12" />
    </section>
  );
}

export default Carta;
