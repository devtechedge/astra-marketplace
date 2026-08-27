import type { Role } from '@/lib/types';

/** Server-only demo accounts. Do not import from client catalog modules. */
const DEMO_PASSWORD_HASH = '$2a$10$sMviDLepnrcHKewf9alGfOrLMRIi6eRNKMegTpCqCfUl7MBH7LxSq';

export const DEMO_USERS: { email: string; passwordHash: string; role: Role }[] = [
  { email: 'customer@demo.com', passwordHash: DEMO_PASSWORD_HASH, role: 'CUSTOMER' },
  { email: 'seller@demo.com', passwordHash: DEMO_PASSWORD_HASH, role: 'SELLER' },
  { email: 'admin@demo.com', passwordHash: DEMO_PASSWORD_HASH, role: 'ADMIN' }
];
