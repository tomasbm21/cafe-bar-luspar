import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { Customer } from '@/content/schema';

const links = [
  { label: 'Nosotros', href: '#about' },
  { label: 'La carta', href: '#carta' },
  { label: 'Reservas', href: '#reservas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export function Nav({ customer }: { customer: Customer }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-fg/8 shadow-lg shadow-black/20'
          : 'bg-transparent',
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:justify-center lg:relative">
        {/* Logo — only visible when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.a
              href="#"
              className="absolute left-4 font-display text-base font-semibold text-fg lg:left-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {customer.business.name}
            </motion.a>
          )}
        </AnimatePresence>

        {/* Centered links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg/60 transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA — only visible when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              className="absolute right-4 hidden lg:block lg:right-6"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Button asChild variant="amber" size="sm" className="rounded-full text-xs tracking-wide">
                <a href="#reservas">{customer.hero.ctaLabel}</a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: brand + hamburger */}
        <a href="#" className="font-display text-lg font-semibold text-fg lg:hidden">
          {customer.business.name}
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-fg" aria-label="Abrir menú">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-bg border-border/40">
            <div className="flex flex-col gap-2 pt-6">
              <span className="font-display text-2xl font-semibold text-fg">{customer.business.name}</span>
              {customer.business.cuisine && (
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{customer.business.cuisine}</span>
              )}
              <nav className="mt-10 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-4 font-display text-xl font-medium text-fg/80 transition-colors hover:bg-muted hover:text-primary"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <Button asChild variant="amber" size="lg" className="mt-8 rounded-full">
                <a href="#reservas" onClick={() => setOpen(false)}>{customer.hero.ctaLabel}</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Nav;
