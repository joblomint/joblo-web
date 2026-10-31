import { ArrowUpRight, CloudSun, Calculator, Plus } from 'lucide-react';
import SectionHead from './SectionHead';

const work = [
  { title: 'Weather App', url: 'https://weather.jkay.my.id', desc: 'A live weather dashboard pulling real-time data from the Open-Meteo API.', tags: ['Astro', 'API'], Icon: CloudSun },
  { title: 'Calculator', url: 'https://calc.jkay.my.id', desc: 'A fully functional calculator with keyboard support and a custom CSS grid layout.', tags: ['HTML', 'JavaScript'], Icon: Calculator },
];

export default function Work() {
  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHead eyebrow="Recent work" title="Things I've built" sub="Live projects you can try right now." />
        <div className="grid gap-5 md:grid-cols-3">
          {work.map(({ title, url, desc, tags, Icon }) => (
            <a key={title} href={url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-44 bg-gradient-to-br from-primary to-primary/70">
                <div className="absolute inset-x-6 top-6 bottom-0 rounded-t-xl bg-background/95 p-3 shadow-lg">
                  <div className="mb-3 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground/30" />)}</div>
                  <div className="grid h-[calc(100%-1.25rem)] place-items-center"><Icon className="h-12 w-12 text-primary" /></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="flex items-center justify-between font-display text-xl font-bold">{title}<ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <div className="mt-4 flex gap-2">{tags.map((t) => <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">{t}</span>)}</div>
              </div>
            </a>
          ))}
          <a href="#contact" className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center transition hover:border-primary">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent"><Plus /></span>
            <h3 className="mt-4 font-display text-xl font-bold">Your project could be next</h3>
            <p className="mt-2 text-sm text-muted-foreground">I'm taking on new clients. Get a free quote — no obligation.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
