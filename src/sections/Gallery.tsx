import { BlurIn } from '@/components/flash/BlurIn';
import CircularGallery from '@/components/flash/CircularGallery';
import type { Customer } from '@/content/schema';

export function Gallery({ customer }: { customer: Customer }) {
  const images = customer.gallery;
  if (!images || images.length === 0) return null;

  const captions = [
    'Sala',
    'Cocina',
    'Producto',
    'Brasa',
    'Mesa',
    'Bodega',
    'Detalle',
    'Servicio',
  ];

  const items = images.slice(0, 8).map((src, i) => ({
    image: src,
    text: captions[i] ?? 'Imagen',
  }));

  return (
    <section id="galeria" className="relative scroll-mt-24 bg-bg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-fg/12" />

      {/* Header — asymmetric Cafe Matin style */}
      <div className="container py-20 md:py-28">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-2 hidden md:block">
            <p className="font-display text-5xl font-black text-fg/15 tabular-nums leading-none">04.</p>
          </div>
          <div className="md:col-span-7">
            <BlurIn delay={0}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">— Galería</p>
            </BlurIn>
            <BlurIn delay={0.05} duration={0.8}>
              <h2
                className="font-display font-black uppercase leading-[0.88] tracking-tight text-fg"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}
              >
                El ambiente.
              </h2>
            </BlurIn>
          </div>
          <div className="md:col-span-3">
            <BlurIn delay={0.2}>
              <p className="font-script italic text-fg/55 text-lg md:text-xl leading-snug">
                Arrastra para explorar →
              </p>
            </BlurIn>
          </div>
        </div>
      </div>

      {/* CircularGallery — WebGL curved gallery */}
      <div className="relative w-full" style={{ height: 'min(80vh, 600px)' }}>
        <CircularGallery
          items={items}
          bend={2.4}
          textColor="#FAEED4"
          borderRadius={0.04}
          scrollEase={0.025}
          scrollSpeed={2.4}
          font="600 22px Georgia, serif"
        />
      </div>

      <div className="border-t border-fg/12 mt-12">
        <div className="container py-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-fg/35 tabular-nums">
          <span>— {customer.business.name}</span>
          <span>{customer.contact.city}</span>
          <span>04 / 06</span>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
