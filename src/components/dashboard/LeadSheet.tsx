import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Mail, MessageCircle, Trash2 } from 'lucide-react';
import { deleteLead } from 'zitejs/api';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@project/components/ui/sheet';
import { Button } from '@project/components/ui/button';
import { Textarea } from '@project/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@project/components/ui/alert-dialog';
import type { Lead, Status } from './LeadsBoard';

type Props = { lead: Lead | null; onClose: () => void; onPatch: (id: string, c: { status?: Status; notes?: string }) => void; onDeleted: (id: string) => void };

const waNumber = (n: string) => { const d = n.replace(/\D/g, ''); return d.startsWith('0') ? `254${d.slice(1)}` : d; };

export default function LeadSheet({ lead, onClose, onPatch, onDeleted }: Props) {
  const [notes, setNotes] = useState('');
  useEffect(() => setNotes(lead?.notes ?? ''), [lead?.id]);

  const del = async () => {
    if (!lead) return;
    try { await deleteLead({ id: lead.id }); onDeleted(lead.id); onClose(); toast.success('Lead deleted'); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <Sheet open={!!lead} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {lead && (
          <>
            <SheetHeader><SheetTitle className="font-display text-2xl">{lead.name}</SheetTitle></SheetHeader>
            <p className="text-sm text-muted-foreground">{lead.business || 'No business name'} · {lead.submittedAt ? format(new Date(lead.submittedAt), 'd MMM yyyy, HH:mm') : ''}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" asChild><a href={`mailto:${lead.email}`}><Mail className="mr-2 h-4 w-4" />Email</a></Button>
              {lead.whatsApp && <Button size="sm" variant="outline" asChild><a href={`https://wa.me/${waNumber(lead.whatsApp)}`} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp</a></Button>}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {[['Email', lead.email], ['WhatsApp', lead.whatsApp], ['Project', lead.projectType], ['Budget', lead.budget], ['Timeline', lead.timeline], ['Status', lead.status]].map(([k, v]) => (
                <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="break-words font-medium">{v || '—'}</dd></div>
              ))}
            </dl>
            <div className="mt-6"><p className="text-sm text-muted-foreground">Message</p><p className="mt-1 whitespace-pre-wrap rounded-lg bg-muted p-3 text-sm">{lead.message}</p></div>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">Private notes</p>
              <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Quote sent, follow up Friday…" />
              <Button size="sm" disabled={notes === lead.notes} onClick={() => { onPatch(lead.id, { notes }); toast.success('Notes saved'); }}>Save notes</Button>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="ghost" className="mt-8 text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete lead</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Delete this lead?</AlertDialogTitle><AlertDialogDescription>This can't be undone.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={del}>Delete</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
