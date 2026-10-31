import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@project/components/ui/accordion';
import SectionHead from './SectionHead';

const faqs = [
  ['How much does a website cost?', 'One-page websites start from KSh 10,000. Larger sites and online shops are quoted based on what you need — send a request and you’ll get a clear price within 24 hours.'],
  ['How long does it take?', 'Most one-page sites are live in 3–5 days. Multi-page sites and shops usually take 1–3 weeks.'],
  ['How do I pay?', 'M-Pesa or bank transfer. Typically 50% to start and 50% on launch.'],
  ['Who owns the website?', 'You do. The domain and all content are yours, and I hand over full access on launch.'],
  ['Do you handle hosting and domains?', 'Yes — I can register your domain and set up fast, secure hosting, or use what you already have.'],
  ['What happens after launch?', 'You get 30 days of free edits. After that, optional monthly care plans cover updates, backups and changes.'],
];

export default function Faq() {
  return (
    <section id="faq" className="bg-secondary/50 py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
