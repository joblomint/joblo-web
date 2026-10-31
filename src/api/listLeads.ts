import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { requireAdmin } from '../server/admin';

const lead = z.object({
  id: z.string(),
  name: z.string(),
  business: z.string(),
  email: z.string(),
  whatsApp: z.string(),
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string(),
  status: z.string(),
  source: z.string(),
  notes: z.string(),
  submittedAt: z.string(),
});

export default createEndpoint({
  description: 'Lists all quote requests for the dashboard',
  authenticated: true,
  inputSchema: z.object({}),
  outputSchema: z.object({ leads: z.array(lead) }),
  execute: async ({ context }) => {
    await requireAdmin(context.user.email);
    const { records } = await zite.leads.findAll({ sort: [{ field: 'submittedAt', direction: 'desc' }], limit: 2000 });
    return {
      leads: records.map((r) => ({
        id: r.id,
        name: r.name ?? '',
        business: r.business ?? '',
        email: r.email ?? '',
        whatsApp: r.whatsApp ?? '',
        projectType: r.projectType ?? '',
        budget: r.budget ?? '',
        timeline: r.timeline ?? '',
        message: r.message ?? '',
        status: r.status ?? 'New',
        source: r.source ?? '',
        notes: r.notes ?? '',
        submittedAt: r.submittedAt ?? '',
      })),
    };
  },
});
