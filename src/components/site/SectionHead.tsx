export default function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
