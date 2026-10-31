import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { isAdmin } from '../server/admin';

export default createEndpoint({
  description: 'Checks whether the signed-in user can open the lead dashboard',
  authenticated: true,
  inputSchema: z.object({}),
  outputSchema: z.object({ isAdmin: z.boolean() }),
  execute: async ({ context }) => ({ isAdmin: await isAdmin(context.user.email) }),
});
