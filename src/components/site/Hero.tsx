import { motion } from 'framer-motion';
import { MessageCircle, Zap, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { whatsappLink } from '../../lib/contact';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/25 blur-3xl" />
      <div className="container relative mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-primary">
            Web designer in Kenya · Taking new clients
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Websites that <span className="text-primary underline decoration-accent decoration-[6px] underline-offset-8">bring you customers</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Fast, secure, mobile-friendly websites for businesses in Kenya and worldwide. From first idea to live site — usually in under a week. Prices from <strong className="text-foreground">KSh 10,000</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild><a href="#contact">Get a free quote in 24h</a></Button>
            <Button size="lg" variant="outline" asChild>
              <a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Chat on WhatsApp</a>
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl">
          <p className="font-display text-2xl font-bold">Every site includes</p>
          <ul className="mt-6 space-y-4">
            {[[Zap, 'Loads in under 2 seconds'], [Smartphone, 'Looks great on every phone'], [ShieldCheck, 'Free SSL & secure hosting setup'], [MessageCircle, 'WhatsApp & contact form built in']].map(([Icon, t]) => {
              const I = Icon as typeof Zap;
              return (
                <li key={t as string} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground"><I className="h-4 w-4" /></span>
                  {t as string}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
