# Prompt: Build a Complete End-to-End Amazon-Style Marketplace Using Agentic Loop Engineering

You are an autonomous senior product-engineering agent. Your task is to design, implement, test, secure, document, and deliver a complete, production-ready, end-to-end e-commerce marketplace inspired by the full modern Amazon shopping experience. Do not copy Amazon’s logo, trademarked branding, copyrighted UI assets, proprietary text, or protected visual identity. Build an original marketplace brand with comparable functional breadth, scalability, usability, and operational completeness.

Use agentic loop engineering principles throughout the project: repeatedly Plan → Act → Observe → Reflect → Verify → Improve until the system is complete and objectively validated. At every stage, maintain a visible task ledger, acceptance criteria, risk register, implementation notes, and test evidence. Do not stop after scaffolding. Continue iterating until the application is fully functional across customer, seller, admin, logistics, payment, search, recommendation, support, analytics, and compliance workflows.

## 1. Core Objective

Build a full-stack marketplace web application that supports browsing, searching, purchasing, reviewing, selling, fulfillment management, customer support, promotions, subscriptions, returns, refunds, analytics, moderation, and administration. The system must be production-grade, responsive, accessible, secure, observable, and deployable.

The final result must include:

- Customer-facing marketplace frontend
- Seller portal
- Admin/back-office portal
- Backend APIs and services
- Database schema and migrations
- Authentication and authorization
- Product catalog and inventory management
- Search, filtering, sorting, and recommendations
- Cart, checkout, payments, orders, shipping, returns, refunds
- Reviews, ratings, Q&A, wishlists, gift options, coupons, deals
- Notifications by email/SMS/in-app where applicable
- Analytics dashboards and operational reporting
- Security, testing, documentation, deployment instructions

## 2. Agentic Loop Operating Rules

Before coding, create a detailed execution plan broken into milestones and verification gates. For each milestone:

1. Define goals and acceptance criteria.
2. Implement the smallest coherent production-quality slice.
3. Run tests and inspections.
4. Observe failures, missing requirements, UX gaps, and security issues.
5. Reflect on root causes.
6. Improve the implementation.
7. Repeat until the milestone passes.

Maintain these artifacts during the build:

- `TASK_LEDGER.md`: features, status, blockers, completion evidence
- `ARCHITECTURE.md`: system design, diagrams in text form, data flow
- `API_SPEC.md`: endpoints, request/response examples, auth rules
- `TEST_REPORT.md`: test commands, results, coverage, known issues
- `SECURITY_REVIEW.md`: threat model, mitigations, checklist
- `DEPLOYMENT.md`: local, staging, production setup
- `CHANGELOG.md`: iterative updates and decisions

Never claim completion unless each major workflow is implemented and verified with tests or manual validation notes.

## 3. Recommended Technology Stack

Choose a modern maintainable stack suitable for production. If no constraints are provided, use:

- Frontend: Next.js or React with TypeScript
- Styling: Tailwind CSS or equivalent design system
- Backend: Node.js/NestJS/Express or Next.js API routes with TypeScript
- Database: PostgreSQL with Prisma or equivalent ORM
- Cache/session/search support: Redis and OpenSearch/Meilisearch where feasible
- Authentication: secure session or JWT with refresh strategy, MFA-ready
- Payments: Stripe test-mode integration or mocked payment provider abstraction
- File storage: local dev storage with S3-compatible abstraction
- Testing: unit, integration, API, E2E tests
- Deployment: Docker Compose plus production deployment guide

If tool or runtime limitations prevent a dependency, replace it with a practical alternative and document the decision.

## 4. User Roles and Permissions

Implement role-based access control for:

- Guest shopper
- Registered customer
- Prime-like subscription customer under an original name
- Seller/vendor
- Warehouse/fulfillment operator
- Customer support agent
- Content moderator
- Marketing manager
- Finance/refund manager
- Super admin

Each role must have appropriate permissions, protected routes, and backend authorization checks.

## 5. Customer Marketplace Features

Implement a polished responsive storefront with:

- Home page with hero sections, personalized recommendations, deals, trending products, categories, recently viewed items, and seasonal campaigns
- Category browsing with nested departments
- Product listing pages with grid/list view, sorting, pagination/infinite loading, facets, price range, ratings, availability, brand, seller, delivery speed, discount, condition, and fulfillment filters
- Product detail pages with image gallery, variants, price, list price, discount, stock, delivery estimates, seller details, buy box logic, add to cart, buy now, wishlist, compare, share, gift options, protection plans, product specifications, descriptions, frequently bought together, sponsored-style placements, Q&A, reviews, rating distribution, related products, and browsing history
- Intelligent search with autocomplete, typo tolerance if supported, suggestions, recent searches, filters, and no-results recovery
- Cart page with quantity changes, save for later, coupons, estimated tax/shipping, gift options, stock warnings, cross-sells, and checkout entry
- Multi-step checkout with address selection, shipping options, payment selection, order review, tax calculation placeholder, coupon validation, gift message, and confirmation page
- Order history with invoices, reorder, shipment tracking, cancellation rules, returns, refunds, and support contact
- User account area with profile, password/security, MFA-ready structure, addresses, payment methods, communication preferences, subscriptions, wishlists, browsing history, reviews, returns, gift cards/store credit, and notification center
- Deals page, coupons page, gift cards page, subscription membership page, registry/wishlist sharing, and customer service help center

## 6. Seller Portal Features

Build a complete seller dashboard including:

- Seller onboarding and store profile setup
- Product creation/editing with images, variants, SKU, price, sale price, inventory, dimensions, shipping settings, taxonomy, attributes, compliance fields, and SEO fields
- Bulk import/export CSV support where practical
- Inventory dashboard with low-stock alerts
- Order management with accept/process/ship/cancel/refund workflows
- Sales analytics, revenue summaries, conversion metrics, product performance, and customer review insights
- Promotions and coupons management
- Seller support tickets
- Payout summary and transaction ledger abstraction
- Policy/compliance warnings and content moderation status

## 7. Admin and Operations Portal

Build a secure admin portal with:

- Overview dashboard: GMV, orders, users, sellers, revenue, refunds, support volume, conversion metrics
- User management: view, search, suspend, roles, activity logs
- Seller management: approve, suspend, audit, view store metrics
- Product moderation: approve/reject listings, flag restricted content, manage categories and attributes
- Order oversight: search orders, inspect payment/shipping/refund status
- Promotion management: sitewide banners, coupons, campaigns, deal scheduling
- Customer support: tickets, conversations, order-linked resolutions
- Return/refund management with approval workflow
- Content management for homepage modules, help pages, FAQs, policies
- Audit logs for sensitive actions
- Feature flags/configuration settings

## 8. Commerce and Logistics Workflows

Implement robust domain logic for:

- Product catalog, categories, attributes, variants, images
- Pricing, discounts, coupons, taxes placeholder, shipping rates placeholder
- Inventory reservation during checkout and release on failure/cancel
- Cart persistence for guest and logged-in users
- Order lifecycle: pending payment, paid, processing, shipped, delivered, cancelled, return requested, returned, refunded
- Shipment records with tracking numbers and carrier fields
- Return merchandise authorization workflow
- Refund records and store credit support
- Notification events for order placed, shipped, delivered, cancelled, returned, refunded
- Subscription membership benefits such as free shipping flag, exclusive deals, and membership dashboard

## 9. Data Model Requirements

Design a normalized database schema covering at least:

Users, roles, sessions, addresses, payment methods abstraction, products, product images, product variants, categories, brands, sellers, seller stores, inventory, carts, cart items, wishlists, wishlist items, orders, order items, shipments, returns, refunds, reviews, review votes, product questions, product answers, coupons, promotions, gift cards/store credits, subscriptions, support tickets, messages, notifications, audit logs, search logs, recommendation events, CMS pages, homepage modules, and feature flags.

Include seed data with realistic categories, sellers, products, users, coupons, orders, reviews, and admin accounts for local testing.

## 10. Security, Privacy, and Compliance

Implement and document:

- Password hashing and secure auth flows
- Role-based authorization on every protected endpoint
- Input validation and output encoding
- CSRF/XSS/SQL injection protections appropriate to the stack
- Rate limiting on auth, checkout, reviews, and support forms
- Secure handling of payment provider tokens; never store raw card numbers
- Audit logs for admin and financial actions
- Privacy controls for user data and account deletion/export placeholders
- Environment variable management
- Safe error handling without leaking secrets
- Accessibility compliance targeting WCAG 2.1 AA

## 11. Testing and Quality Gates

Create meaningful tests for:

- Authentication and authorization
- Product browsing/search/filtering
- Cart and checkout
- Coupon logic
- Inventory reservation
- Order lifecycle
- Seller product/order flows
- Admin moderation and role controls
- Reviews/Q&A validation
- Returns/refunds
- API validation and error handling

Run linting, type checks, unit tests, integration tests, and at least critical E2E flows. Fix failures before final delivery. Include test commands and results in `TEST_REPORT.md`.

## 12. UX and Design Requirements

Create a polished original design system with reusable components:

- Header with search, categories, account menu, orders, cart, location selector
- Mobile navigation and responsive layouts
- Product cards, rating stars, badges, deal labels, skeleton loaders
- Accessible forms, modals, tables, tabs, accordions, alerts, toasts
- Empty states and error states
- Checkout progress indicator
- Admin/seller dashboard layouts

Do not use Amazon branding, color identity, logos, icons, copy, or protected assets. Use original names, colors, and content.

## 13. Observability and Operations

Add:

- Structured logging
- Error boundaries and API error formats
- Health check endpoint
- Basic performance considerations and caching strategy
- Database indexes for search and common queries
- Admin-visible audit trails
- Documentation for monitoring integration points

## 14. Final Delivery Checklist

Before declaring completion, verify:

- The app runs locally from documented commands
- Seed data loads successfully
- All core pages render without crashes
- Customer can register, browse, search, add to cart, checkout, view order, request return
- Seller can onboard, add products, manage orders, view analytics
- Admin can manage users, sellers, products, orders, promotions, support, and refunds
- Auth and permissions are enforced server-side
- Tests pass or documented limitations are clearly justified
- No protected Amazon assets or branding are used
- Documentation is complete and accurate

## 15. Final Response Format

When finished, provide:

1. Summary of what was built
2. Local setup commands
3. Demo credentials for customer, seller, and admin
4. Test results summary
5. Known limitations, if any
6. File/folder overview
7. Clear next steps for production deployment

Proceed autonomously using the agentic loop. Keep improving the implementation until the result is a complete, validated, production-ready Amazon-style marketplace with original branding and full end-to-end functionality.