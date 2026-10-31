import { EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '../../lib/contact';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground py-12 text-background">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">Joblo Web</p>
          <p className="mt-2 text-sm opacity-70">Websites that bring you customers. Based in Kenya, working worldwide.</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold">Contact</p>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block opacity-70 hover:opacity-100">WhatsApp: {WHATSAPP_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`} className="block opacity-70 hover:opacity-100">{EMAIL}</a>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold">Explore</p>
          {[['Services', '#services'], ['Work', '#work'], ['FAQ', '#faq'], ['Get a quote', '#contact']].map(([l, h]) => (
            <a key={h} href={h} className="block opacity-70 hover:opacity-100">{l}</a>
          ))}
        </div>
      </div>
      <div className="container mx-auto mt-10 px-4 text-xs opacity-50">© {new Date().getFullYear()} Joblo Web. All rights reserved.</div>
    </footer>
  );
}
