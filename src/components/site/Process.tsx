import SectionHead from './SectionHead';

const steps = [
  ['Discovery', 'A quick chat (WhatsApp or call) about your business, goals and budget.'],
  ['Design', 'I share a design preview. You give feedback until it feels right.'],
  ['Build', 'I build a fast, mobile-friendly site and connect your domain.'],
  ['Launch', 'Your site goes live, set up on Google so customers can find you.'],
  ['Support', '30 days of free edits, then optional monthly care plans.'],
];

export default function Process() {
  return (
    <section id="process" className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">How it works</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">From idea to live in about a week</h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-primary-foreground/15 p-5">
              <span className="font-display text-4xl font-extrabold text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-primary-foreground/75">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
