import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { requireAdmin } from '../server/admin';

export default createEndpoint({
  description: 'Updates a lead status or notes',
  authenticated: true,
  inputSchema: z.object({
    id: z.string(),
    status: z.enum(['New', 'Contacted', 'Quoted', 'Won', 'Lost']).optional(),
    notes: z.string().optional(),
  }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async ({ input, context }) => {
    await requireAdmin(context.user.email);
    const record: { status?: string; notes?: string } = {};
    if (input.status) record.status = input.status;
    if (input.notes !== undefined) record.notes = input.notes;
    await zite.leads.update({ id: input.id, record });
    return { success: true };
  },
});
