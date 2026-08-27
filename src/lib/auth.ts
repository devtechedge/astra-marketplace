import bcrypt from 'bcryptjs';
import { DEMO_USERS } from '@/lib/server/demoUsers';
import type { Role } from './types';

export async function authenticate(email: string, password: string) {
  const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { email: user.email, role: user.role as Role };
}

export function authorize(role: Role, allowed: Role[]) {
  return allowed.includes(role);
}
