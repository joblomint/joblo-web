import { useEffect, useMemo, useState } from 'react';
import { listLeads, updateLead, ListLeadsOutputType } from 'zitejs/api';
import { Input } from '@project/components/ui/input';
import { Skeleton } from '@project/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import LeadsTable from './LeadsTable';
import LeadSheet from './LeadSheet';

export type Lead = ListLeadsOutputType['leads'][0];
export const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Lost'] as const;
export type Status = (typeof STATUSES)[number];

export default function LeadsBoard() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    listLeads({}).then((r) => setLeads(r.leads)).catch(() => toast.error('Could not load leads'));
  }, []);

  const patch = async (id: string, change: { status?: Status; notes?: string }) => {
    const prev = leads;
    setLeads((l) => l?.map((x) => (x.id === id ? { ...x, ...change } : x)) ?? null);
    try { await updateLead({ id, ...change }); } catch { setLeads(prev); toast.error('Update failed'); }
  };
  const remove = (id: string) => setLeads((l) => l?.filter((x) => x.id !== id) ?? null);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return (leads ?? []).filter((l) => (status === 'all' || l.status === status) &&
      [l.name, l.business, l.email, l.whatsApp, l.message].some((v) => v.toLowerCase().includes(s)));
  }, [leads, q, status]);

  const count = (s: string) => (leads ?? []).filter((l) => l.status === s).length;
  const open = leads?.find((l) => l.id === openId) ?? null;

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatus(status === s ? 'all' : s)}
            className={`rounded-xl border bg-card p-4 text-left transition ${status === s ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
            <p className="text-sm text-muted-foreground">{s}</p>
            <p className="font-display text-3xl font-bold">{leads ? count(s) : '–'}</p>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search name, email, message…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {leads === null ? (
        <div className="space-y-2">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
      ) : (
        <LeadsTable data={filtered} onOpen={setOpenId} onStatus={(id, s) => patch(id, { status: s })} />
      )}
      <LeadSheet lead={open} onClose={() => setOpenId(null)} onPatch={patch} onDeleted={remove} />
    </main>
  );
}
