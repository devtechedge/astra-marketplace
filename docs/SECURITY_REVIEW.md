# Security Review

## Threat Model

| Threat | Mitigation |
|---|---|
| Credential stuffing | Rate limit auth endpoints in production, lockout/MFA hooks |
| Broken access control | Role enum, centralized authorization helper, server-side route guards recommended |
| XSS | React escaping, no unsafe HTML, strict validation |
| SQL injection | Prisma parameterized queries in production mode |
| CSRF | SameSite cookies or CSRF tokens when switching from token demo to cookie sessions |
| Payment data leakage | Store only provider token references; never raw card data |
| Admin abuse | AuditLog model for sensitive actions |
| PII exposure | Privacy export/delete placeholders, secure error handling, least privilege |
| Inventory race | Transactional inventory reservation required in Prisma adapter |

## Checklist

- Passwords hashed with bcrypt in seed and production adapter.
- Environment secrets kept outside git via `.env`.
- API requests validated with Zod.
- Protected routes documented for RBAC enforcement.
- Mock payment provider clearly separated.
- Audit, notifications and support models included.
- Accessibility target: WCAG 2.1 AA through semantic HTML, focus styles and contrast-aware colors.

## Production Hardening Tasks

1. Add middleware-based session validation.
2. Add rate limiting with Redis.
3. Add CSP/security headers.
4. Add dependency scanning in CI.
5. Enforce server-side permission checks for every mutation.
6. Add transactional order creation and inventory locks.
