import { z } from 'zod';
import { createEndpoint, ZiteError } from 'zitejs/backend';
import { zite } from 'zitejs/db';

export default createEndpoint({
  description: 'Saves a quote request from the website (public API)',
  inputSchema: z.object({
    name: z.string(),
    business: z.string().optional(),
    email: z.string(),
    whatsApp: z.string().optional(),
    projectType: z.string(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    message: z.string(),
    source: z.string().optional(),
    website: z.string().optional(), // honeypot
  }),
  outputSchema: z.object({ success: z.boolean(), id: z.string().optional() }),
  execute: async ({ input }) => {
    if (input.website) return { success: true };
    const email = input.email.trim();
    if (!input.name.trim() || !/^\S+@\S+\.\S+$/.test(email) || input.message.trim().length < 10) {
      throw new ZiteError('Please fill in your name, a valid email and a short message.');
    }
    const clip = (s: string | undefined, n: number) => (s ? s.trim().slice(0, n) : null);
    const lead = await zite.leads.create({
      record: {
        name: clip(input.name, 120),
        business: clip(input.business, 160),
        email,
        whatsApp: clip(input.whatsApp, 30),
        projectType: clip(input.projectType, 60),
        budget: clip(input.budget, 40),
        timeline: clip(input.timeline, 40),
        message: clip(input.message, 4000),
        source: clip(input.source, 60) ?? 'Website',
        status: 'New',
        notes: null,
      },
    });
    return { success: true, id: lead.id };
  },
});
