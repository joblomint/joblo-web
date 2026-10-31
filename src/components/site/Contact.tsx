import { Mail, MessageCircle } from 'lucide-react';
import { EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '../../lib/contact';
import QuoteForm from './QuoteForm';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Get a quote</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Let's build something</h2>
          <p className="mt-3 text-lg text-muted-foreground">Tell me about your project and you'll get a free, no-obligation quote within 24 hours.</p>
          <div className="mt-8 space-y-3">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"><MessageCircle className="h-5 w-5" /></span>
              <div><p className="font-semibold">WhatsApp</p><p className="text-sm text-muted-foreground">{WHATSAPP_DISPLAY}</p></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent"><Mail className="h-5 w-5" /></span>
              <div><p className="font-semibold">Email</p><p className="text-sm text-muted-foreground">{EMAIL}</p></div>
            </a>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
