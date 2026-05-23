import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Users, Phone, MessageCircle, Info } from 'lucide-react';
import { BlurIn } from '@/components/flash/BlurIn';
import { ParallaxLayer } from '@/components/flash/ParallaxLayer';
import { MagneticButton } from '@/components/flash/MagneticButton';
import { StaggerList } from '@/components/flash/StaggerList';
import { Button } from '@/components/ui/button';
import type { Customer } from '@/content/schema';

const TIME_SLOTS = [
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '20:30', '21:00', '21:30', '22:00', '22:30',
];
const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  note: string;
}

function InputField({
  label, icon: Icon, id, type = 'text', placeholder, value, onChange, required,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="h-12 w-full rounded-xl border border-border bg-bg/50 px-4 text-sm text-fg placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
      />
    </div>
  );
}

function SelectField({
  label, icon: Icon, id, options, value, onChange, required,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="h-12 w-full cursor-pointer rounded-xl border border-border bg-bg/50 px-4 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none"
      >
        <option value="" disabled>Seleccionar…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export function Reservas({ customer }: { customer: Customer }) {
  const reservas = customer.reservas;
  if (!reservas?.enabled) return null;

  const [form, setForm] = useState<FormState>({ name: '', phone: '', date: '', time: '', guests: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservas.phone) return;
    const msg = encodeURIComponent(
      `Hola, quiero reservar una mesa:\n\n` +
      `👤 Nombre: ${form.name}\n` +
      `📅 Fecha: ${form.date}\n` +
      `🕐 Hora: ${form.time}\n` +
      `👥 Personas: ${form.guests}\n` +
      `📞 Teléfono: ${form.phone}` +
      (form.note ? `\n\n📝 Nota: ${form.note}` : ''),
    );
    const phone = reservas.phone.replace(/[\s+]/g, '');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="reservas" className="relative scroll-mt-24 bg-bg py-28 md:py-40 overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/6 blur-[100px]" />

      <div className="container relative">
        {/* Asymmetric header */}
        <div className="grid items-end gap-6 md:grid-cols-12 mb-16">
          <div className="md:col-span-2 hidden md:block">
            <p className="font-display text-5xl font-black text-fg/15 tabular-nums leading-none">03.</p>
          </div>
          <div className="md:col-span-7">
            {reservas.eyebrow && (
              <BlurIn delay={0}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">— {reservas.eyebrow}</p>
              </BlurIn>
            )}
            <BlurIn delay={0.05} duration={0.8}>
              <h2
                className="font-display font-black uppercase leading-[0.88] tracking-tight text-fg"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}
              >
                {reservas.title ?? 'Reserve su mesa'}
              </h2>
            </BlurIn>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Text side */}
          <div>
            {reservas.body && (
              <BlurIn delay={0.2}>
                <p className="text-base leading-relaxed text-fg/65 md:text-lg">{reservas.body}</p>
              </BlurIn>
            )}

            <StaggerList className="mt-10 flex flex-col gap-4" stagger={0.1} delay={0.3}>
              {reservas.phone && (
                <a
                  href={`tel:${reservas.phone.replace(/\s+/g, '')}`}
                  className="group flex items-center gap-4 text-fg/60 hover:text-primary transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/50 bg-card group-hover:border-primary/40 transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{reservas.phone}</span>
                </a>
              )}
              {reservas.url && (
                <a
                  href={reservas.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-fg/60 hover:text-primary transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/50 bg-card group-hover:border-primary/40 transition-colors">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </a>
              )}
            </StaggerList>

            {reservas.image && (
              <ParallaxLayer speed={0.15} className="mt-12 hidden lg:block rounded-2xl">
                <div className="overflow-hidden rounded-2xl shadow-xl shadow-black/35">
                  <img src={reservas.image} alt="Mesa" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                </div>
              </ParallaxLayer>
            )}
          </div>

          {/* Form side */}
          <BlurIn delay={0.15} className="rounded-2xl border border-border/40 bg-card shadow-2xl shadow-black/25">
            <div className="p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-14 text-center"
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl font-bold text-fg">¡Mensaje enviado!</h3>
                  <p className="mt-3 text-muted-foreground">Confirmamos su reserva por WhatsApp en breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-display text-2xl font-bold text-fg mb-1">Solicitar reserva</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField label="Nombre" icon={Users} id="name" placeholder="Su nombre" value={form.name} onChange={set('name')} required />
                    <InputField label="Teléfono" icon={Phone} id="phone" type="tel" placeholder="+34 600 000 000" value={form.phone} onChange={set('phone')} required />
                    <InputField label="Fecha" icon={CalendarDays} id="date" type="date" value={form.date} onChange={set('date')} required />
                    <SelectField label="Hora" icon={Clock} id="time" options={TIME_SLOTS} value={form.time} onChange={set('time')} required />
                  </div>

                  <SelectField label="Personas" icon={Users} id="guests" options={GUEST_OPTIONS} value={form.guests} onChange={set('guests')} required />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="note" className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Nota (opcional)</label>
                    <textarea
                      id="note"
                      rows={2}
                      placeholder="Alergias, ocasión especial…"
                      value={form.note}
                      onChange={e => set('note')(e.target.value)}
                      className="w-full resize-none rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-fg placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>

                  <MagneticButton className="w-full" strength={0.15}>
                    <Button type="submit" variant="amber" size="lg" className="w-full rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Enviar por WhatsApp
                    </Button>
                  </MagneticButton>

                  {reservas.note && (
                    <p className="flex items-start gap-2 text-[11px] text-muted-foreground/50">
                      <Info className="mt-0.5 h-3 w-3 shrink-0" />
                      {reservas.note}
                    </p>
                  )}
                </form>
              )}
            </div>
          </BlurIn>
        </div>
      </div>
    </section>
  );
}

export default Reservas;
