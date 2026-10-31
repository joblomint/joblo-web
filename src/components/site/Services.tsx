import { Check } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import SectionHead from './SectionHead';

const plans = [
  { name: 'One-Page Website', price: 'From KSh 10,000', time: '3–5 days', desc: 'A single, beautiful page that tells your whole story — perfect for small businesses.', items: ['Mobile-friendly design', 'WhatsApp & contact form', 'Google Maps & social links', 'Basic SEO setup'] },
  { name: 'Multi-Page Site', price: 'Custom quote', time: '1–2 weeks', desc: 'Home, About, Services, Contact and more — for growing businesses.', items: ['Up to 8 pages', 'Content guidance', 'Google Business Profile setup', 'Analytics'], featured: true },
  { name: 'E-commerce', price: 'Custom quote', time: '2–3 weeks', desc: 'Sell online with a product catalog and secure checkout.', items: ['Product catalog', 'M-Pesa / card payments', 'Order notifications', 'Inventory basics'] },
  { name: 'Redesign & Rescue', price: 'Custom quote', time: '1–2 weeks', desc: 'Outdated or slow site? I rebuild it faster, cleaner and more modern.', items: ['Speed & SEO audit', 'Modern redesign', 'Content migration', 'No downtime switch'] },
];

export default function Services() {
  return (
    <section id="services" className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4">
        <SectionHead eyebrow="Services & pricing" title="Clear prices, no surprises" sub="Every project is custom — these are the most common starting points." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <div key={p.name} className={`flex flex-col rounded-2xl border p-6 ${p.featured ? 'border-primary bg-card shadow-lg' : 'border-border bg-card'}`}>
              {p.featured && <span className="mb-3 w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold">Most popular</span>}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-2xl font-bold text-primary">{p.price}</p>
              <p className="text-xs text-muted-foreground">Typical delivery: {p.time}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {p.items.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{i}</li>)}
              </ul>
              <Button className="mt-6" variant={p.featured ? 'default' : 'outline'} asChild><a href="#contact">Get a quote</a></Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
