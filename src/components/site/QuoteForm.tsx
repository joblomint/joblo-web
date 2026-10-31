import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitQuote } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Label } from '@project/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Choose a project type'),
  message: z.string().trim().min(10, 'Tell me a little more (10+ characters)'),
});

const types = ['One-Page Website', 'Multi-Page Site', 'E-commerce', 'Redesign', 'Other'];
const budgets = ['KSh 10k–25k', 'KSh 25k–60k', 'KSh 60k+', 'Not sure'];
const timelines = ['ASAP', 'Within a month', 'Flexible'];

type Form = Record<'name' | 'business' | 'email' | 'whatsApp' | 'projectType' | 'budget' | 'timeline' | 'message' | 'website', string>;
const empty: Form = { name: '', business: '', email: '', whatsApp: '', projectType: '', budget: '', timeline: '', message: '', website: '' };

export default function QuoteForm() {
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof Form) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await submitQuote({ ...f, source: 'Website' });
      setDone(true);
    } catch {
      toast.error('Something went wrong. Please try WhatsApp instead.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <h3 className="mt-4 font-display text-2xl font-bold">Thanks, {f.name.split(' ')[0]}!</h3>
        <p className="mt-2 text-muted-foreground">Your request is in. I'll get back to you within 24 hours.</p>
        <Button variant="outline" className="mt-6" onClick={() => { setF(empty); setDone(false); }}>Send another</Button>
      </div>
    );
  }

  const field = (k: keyof Form, label: string, el: React.ReactNode) => (
    <div className="space-y-1.5">
      <Label htmlFor={k}>{label}</Label>
      {el}
      {errors[k] && <p className="text-sm text-destructive">{errors[k]}</p>}
    </div>
  );
  const pick = (k: keyof Form, opts: string[], ph: string) => (
    <Select value={f[k] || undefined} onValueChange={set(k)}>
      <SelectTrigger id={k}><SelectValue placeholder={ph} /></SelectTrigger>
      <SelectContent>{opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
    </Select>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2 md:p-8">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={f.website} onChange={(e) => set('website')(e.target.value)} />
      {field('name', 'Your name *', <Input id="name" value={f.name} onChange={(e) => set('name')(e.target.value)} />)}
      {field('business', 'Business name', <Input id="business" value={f.business} onChange={(e) => set('business')(e.target.value)} />)}
      {field('email', 'Email *', <Input id="email" type="email" value={f.email} onChange={(e) => set('email')(e.target.value)} />)}
      {field('whatsApp', 'WhatsApp number', <Input id="whatsApp" type="tel" placeholder="07..." value={f.whatsApp} onChange={(e) => set('whatsApp')(e.target.value)} />)}
      {field('projectType', 'Project type *', pick('projectType', types, 'Choose one'))}
      {field('budget', 'Budget', pick('budget', budgets, 'Choose a range'))}
      <div className="sm:col-span-2">{field('timeline', 'Timeline', pick('timeline', timelines, 'When do you need it?'))}</div>
      <div className="sm:col-span-2">{field('message', 'Tell me about your project *', <Textarea id="message" rows={5} value={f.message} onChange={(e) => set('message')(e.target.value)} />)}</div>
      <Button type="submit" size="lg" className="sm:col-span-2" disabled={busy}>
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Get my free quote
      </Button>
    </form>
  );
}
