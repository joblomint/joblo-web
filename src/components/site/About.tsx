import { MapPin, Clock, Code2 } from 'lucide-react';
import SectionHead from './SectionHead';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead eyebrow="About" title="A developer, not an agency" />
          <div className="-mt-6 space-y-4 text-lg text-muted-foreground">
            <p>Joblo Web is an independent web studio based in Kenya. When you work with me, you talk directly to the person building your site — no account managers, no hand-offs.</p>
            <p>I focus on what actually matters for small businesses: sites that load fast on mobile data, show up on Google, and make it easy for customers to reach you.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[[MapPin, 'Based in Kenya', 'Serving clients locally and worldwide'], [Clock, 'Reply within 24h', 'On WhatsApp or email'], [Code2, 'Modern tech', 'Fast, secure, easy to update']].map(([I, t, d]) => {
            const Icon = I as typeof MapPin;
            return (
              <div key={t as string} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/30 text-primary"><Icon className="h-5 w-5" /></span>
                <div><p className="font-semibold">{t as string}</p><p className="text-sm text-muted-foreground">{d as string}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
