import { ZiteError } from 'zitejs/backend';
import { zite } from 'zitejs/db';

export async function isAdmin(email: string) {
  const row = await zite.admins.findOne({ filters: { email: email.toLowerCase() } });
  return !!row;
}

export async function requireAdmin(email: string) {
  if (!(await isAdmin(email))) {
    throw new ZiteError('You do not have access to the dashboard.');
  }
}
