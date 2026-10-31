import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@project/components/ui/button';

const links = [
  ['Services', '#services'],
  ['Work', '#work'],
  ['Process', '#process'],
  ['About', '#about'],
  ['FAQ', '#faq'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-accent">J</span>
          Joblo Web
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="text-muted-foreground transition-colors hover:text-foreground">{l}</a>
          ))}
          <Button asChild><a href="#contact">Free quote in 24h</a></Button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-muted">{l}</a>
          ))}
          <Button asChild className="mt-2"><a href="#contact" onClick={() => setOpen(false)}>Free quote in 24h</a></Button>
        </nav>
      )}
    </header>
  );
}
