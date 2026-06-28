import { demoUsers } from './demoData';
import type { Role } from './types';

export function authenticate(email: string, password: string) {
  const user = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return null;
  return { email: user.email, role: user.role as Role, token: Buffer.from(`${user.email}:${user.role}`).toString('base64') };
}

export function authorize(role: Role, allowed: Role[]) {
  return allowed.includes(role);
}
