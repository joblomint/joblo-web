import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';
import { requireAdmin } from '../server/admin';

export default createEndpoint({
  description: 'Deletes a lead',
  authenticated: true,
  inputSchema: z.object({ id: z.string() }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async ({ input, context }) => {
    await requireAdmin(context.user.email);
    await zite.leads.delete({ id: input.id });
    return { success: true };
  },
});
