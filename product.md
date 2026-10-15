# product.md — Nexora Technologies Public Website and CMS

Product definition for contributors, designers, developers, testers and AI agents. It explains **what we are building, for whom, and why**. For engineering rules see `AGENTS.md`. For detailed requirements see the System Requirements Specification (SRS) v1.1.

| Field | Value |
|---|---|
| Product | Nexora Technologies public website with CMS and admin dashboard |
| Company | Nexora Technologies (proposed business; legal name and registration to be confirmed) |
| Tagline | Building What Comes Next. |
| Market | Sierra Leone; English at launch |
| Baseline | SRS v1.1, 13 October 2026 |
| Product owner | Founder of Nexora Technologies |
| Status | Planning baseline; requires founder approval |

---

## 1. Product summary

Nexora Technologies is a proposed Sierra Leone technology company that plans to offer software development, business digitisation, custom software, IT support and, later, subscription-based business software.

This product is the company's **public website**, managed through a **protected CMS and admin dashboard**. It has two jobs:

1. **Win trust.** Show visitors, clearly and honestly, what Nexora does, who it serves and how it works.
2. **Generate qualified enquiries.** Turn visits into consultation, quotation and project requests, and give the team a safe place to manage them.

The website is a **marketing and lead-generation system**. It is not the Nexora Business SaaS application, and it must never imply that planned products already exist.

---

## 2. Vision, problem and opportunity

### 2.1 The problem

- Many small and medium businesses in Sierra Leone run on paper, scattered spreadsheets and informal tools, and struggle to find a trustworthy, local technology partner.
- A new company with no track record must earn credibility quickly, without exaggerating.
- A solo founder cannot afford a website that needs a developer for every text change, nor one that risks leaking enquiry data.

### 2.2 What this product solves

| Need | How the product responds |
|---|---|
| "Can I trust this company?" | Clear, truthful content, honest product status, no unverified claims, responsible data handling |
| "What do they actually do for me?" | Service pages written around customer outcomes, scope and limits |
| "How do I get started?" | One-step enquiry paths and a clear call to action on every key page |
| "Will it work on my phone and connection?" | Lightweight, mobile-first pages and clear form feedback |
| "Can the founder run this alone?" | Admin dashboard for content, publishing and enquiries, with no code changes |
| "Is our data safe?" | Role-based access, MFA, audit log, minimal data collection, retention controls |

### 2.3 Vision statement

The company's formal mission, vision and values are **not yet supplied**. Do not invent them. Placeholder content must use `[[CONFIRM: ...]]` tokens until the founder approves wording (see `AGENTS.md` section 13).

---

## 3. Product principles

1. **Truth over polish.** If we cannot prove it, we do not say it. Planned means planned.
2. **Clarity over cleverness.** A busy shop owner on a phone should understand the offer in seconds.
3. **Mobile and low-bandwidth first.** Fast, light and usable on constrained connections.
4. **Enquiries are the outcome.** Every page leads somewhere useful.
5. **The founder stays in control.** Content, claims and publishing are approved by people, not automated.
6. **Secure by default.** The admin area is never public; access is least-privilege and audited.
7. **Maintainable by one person.** Simple, documented, affordable to run.
8. **Accessible to everyone.** WCAG 2.2 AA is the target, not an afterthought.

---

## 4. Target users

### 4.1 Public visitors

| User | Need | Journey |
|---|---|---|
| SME prospect | Understand services and whether Nexora fits | Home → Services → Contact / Quote |
| Custom software prospect | Explain requirements and get scoped | Services → Project enquiry → Confirmation |
| Product prospect | Check Nexora Business status | Products → Nexora Business → Interest enquiry |
| Referral / partner | Check credibility and find contact details | About → Services → Contact |

Primary audience assumption: **SMEs in Sierra Leone**. The first segment (for example retailers or wholesalers) is to be confirmed.

### 4.2 Internal users (admin dashboard)

| Role | Goal | Journey |
|---|---|---|
| Administrator (founder) | Control content, publishing, users, settings and enquiries | Sign in with MFA → Dashboard → Review drafts → Publish / manage users |
| Content Editor | Update pages, services, FAQs and media without code | Sign in → Content → Edit draft → Preview → Submit for review |
| Enquiry Handler | Review and follow up enquiries and product interest | Sign in → Enquiries → Open → Update status and notes |

The permission matrix is defined in `AGENTS.md` section 10.2 and SRS Appendix D.

---

## 5. What Nexora offers (website content scope)

The website describes these services. Final copy, scope and any pricing require founder approval.

| Service | Intended outcome | Route |
|---|---|---|
| Web development | Websites and web applications that fit the business | `/services/web-development` |
| Business digitisation | Workflow setup, spreadsheet cleanup and reporting | `/services/business-digitisation` |
| Custom software | Custom business systems, starting with project discovery | `/services/custom-software` |
| IT support | Defined support scope, hours and limitations | `/services/it-support` |

### Products

| Product | Status | Notes |
|---|---|---|
| Nexora Business | **Planned** (label to be confirmed as Planned or Pilot) | Subscription business software; shown with purpose, intended users, planned features and an interest call to action. Never shown as purchasable until the status is Available |

Allowed status labels: **Planned, Pilot, Available**. Only an Administrator may set Available.

---

## 6. Product capabilities

### 6.1 Public website

- Home page with value proposition, main call to action, services summary, product preview, working process and contact call to action.
- Service pages with customers, outcomes, scope, limits and enquiry path.
- Products overview with truthful availability labels.
- About, FAQ, contact, privacy and terms pages.
- Optional portfolio, shown only for genuine work with recorded permission.
- Secure contact and project enquiry form with validation and spam protection.
- Product interest form with a clear privacy notice.
- Search-engine and social-sharing metadata, sitemap and robots rules.
- Optional privacy-conscious analytics, enabled only after privacy review.

### 6.2 Content management and admin dashboard

- Structured content types for pages, services, products, FAQs, portfolio, testimonials and logos, media, navigation, footer and site settings.
- Draft, In review, Published and Archived statuses; only Published content is public.
- Live preview on the real public template before publishing.
- Version history with compare and restore.
- Scheduled publish and unpublish.
- Published changes visible within 60 seconds, with no redeployment.
- Media library with required alt text, size limits and optimisation.
- Automatic redirects when a published slug changes.
- Editable SEO fields on every indexable page.
- Dashboard home showing new enquiries, drafts awaiting review, recent changes and content health checks.

### 6.3 Enquiry management

- Every enquiry is **stored first**, then a notification email is sent.
- Enquiry inbox with source form, status (New, In progress, Responded, Closed, Spam), assignee, internal notes and timestamps.
- Submitted visitor data is read-only; handlers change only status, assignee and notes.
- Failed notifications are flagged for follow-up, so no lead is lost.
- Retention review dates, deletion or anonymisation on request, and Administrator-only CSV export.

### 6.4 Security and trust features

- No public registration; users are invited by an Administrator.
- Mandatory MFA for Administrators; strong passwords and brute-force protection.
- Secure sessions with timeouts and server-side invalidation.
- Append-only audit log of admin activity.
- Admin area excluded from search engines and not linked publicly.
- Backups with tested restoration.

---

## 7. Content and messaging

### 7.1 Voice and tone

Professional, clear, practical, trustworthy and future-oriented. Plain English. Short sentences. Outcomes before features. No hype, no unverifiable superlatives, no jargon without explanation.

### 7.2 Suggested homepage structure

1. **Header:** compact N logo, Nexora Technologies wordmark, Services, Products, About, Contact and a primary enquiry button.
2. **Hero:** "Practical Technology for Growing Businesses" with actions "Discuss Your Project" and "Explore Services".
3. **Services:** Web Development, Business Digitisation, Custom Software and IT Support.
4. **Products:** Nexora Business with a truthful Planned or Pilot status.
5. **How we work:** Discover → Scope → Build → Test → Support.
6. **Why Nexora:** clear scope, practical implementation, local support and responsible data handling.
7. **Closing call to action:** invite visitors to describe a business challenge.
8. **Footer:** confirmed contact details, service links, privacy and terms.

Each block is an editable CMS section. Layout, styling and brand tokens remain controlled in code.

### 7.3 Messaging guardrails

| Do | Do not |
|---|---|
| Describe outcomes and scope clearly | Invent clients, testimonials, logos, awards or certifications |
| Say quotes depend on scope | Publish prices that are not approved |
| Label Nexora Business as Planned or Pilot | Present planned features as available |
| Offer more than one way to make contact | Promise response times we cannot meet |
| Explain how enquiry data is used | Publish an address, WhatsApp number or map before confirmation |
| Credit and licence images properly | Use images or text without rights |

---

## 8. Brand and experience

| Element | Standard |
|---|---|
| Palette | Midnight Navy `#0B1220`, Electric Blue `#2563EB`, Cyan `#38BDF8`, Cloud White `#F8FAFC` |
| Logo | Approved geometric N symbol and wordmark; keep clear space; never stretch or recolour |
| Typography | Readable, modern sans-serif with a consistent scale |
| Style | Clean, technology-forward, restrained gradients, strong contrast |
| Layout | Responsive grid, reusable cards, buttons and forms |
| Motion | Subtle; respects reduced-motion; never blocks a task |
| Images | Owned or licensed, optimised, described with alt text |
| Accessibility | WCAG 2.2 AA: keyboard, visible focus, labels, errors, contrast |

Brand tokens live in code and are not editable in the CMS. The admin dashboard uses Nexora branding where the CMS allows, but usability and accessibility come first.

---

## 9. Key user journeys

### 9.1 Visitor submits a project enquiry

1. Visitor lands on Home or Services on a phone.
2. Reads what Nexora does and who it serves.
3. Selects "Discuss Your Project".
4. Completes the form (name, email or phone, service interest, message, optional organisation and budget range).
5. Sees clear, accessible validation if something is wrong, with valid input preserved.
6. Sees a confirmation **only after** the server has stored the enquiry.
7. Founder is notified; the enquiry appears in the dashboard as New.

### 9.2 Visitor checks product status

1. Visitor opens Products, then Nexora Business.
2. Sees an honest status label, purpose, intended users and planned features.
3. Registers interest through a short form with a privacy notice. No purchase action appears unless status is Available.

### 9.3 Editor updates content

1. Editor signs in (with MFA if enabled for their account).
2. Opens a service or FAQ item and edits the draft.
3. Previews on the real public template.
4. Submits for review.
5. Administrator reviews, publishes, and the public page updates within 60 seconds.

### 9.4 Handler follows up an enquiry

1. Handler opens the enquiry inbox and selects a New enquiry.
2. Contacts the visitor outside the system, using their preferred method.
3. Updates status and adds internal notes.
4. The action is recorded in the audit log.

### 9.5 Administrator onboards a new editor

1. Administrator invites the user by email and assigns a role.
2. User accepts, sets a password and configures MFA.
3. Administrator can deactivate the account instantly at any time.

---

## 10. Goals and success measures

The SRS defines acceptance criteria. The measures below are **proposed targets** to be agreed with the founder. Baselines are unknown until launch, so set numeric targets after the first 60 to 90 days of real data.

| Goal | Measure | Proposed target |
|---|---|---|
| Generate qualified enquiries | Enquiries per month; share that are relevant and answerable | Set after baseline; track from launch |
| Convert visitors to enquiries | Enquiry form completion rate | Set after baseline |
| Reliable lead capture | Enquiries stored versus submissions attempted; failed notifications resolved | 100% stored; failures followed up the same working day |
| Fast, usable pages | Core Web Vitals at the 75th percentile (LCP, INP, CLS) | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| Accessibility | Automated and manual WCAG 2.2 AA checks | No critical failures at launch |
| Editor independence | Non-technical editor completes edit, add FAQ, replace image, publish using the guide | Passes AC-024 with about one hour of training |
| Fast publishing | Time from publish to live | ≤ 60 seconds |
| Trustworthy content | Unapproved claims on the live site | Zero |
| Secure operations | Admin access findings from pre-launch security review | No open high or critical findings at launch |
| Recoverability | Successful restore test of database and media | Passed before launch; repeated periodically |

Analytics used to measure these must match the privacy notice and be enabled only after privacy review.

---

## 11. Scope

### 11.1 In scope for version 1

- Public marketing pages, shared navigation and footer.
- Service listings and detail pages; products overview with truthful labels.
- About, FAQ, contact, privacy and terms.
- Secure enquiry and product-interest forms with validation and spam controls.
- Protected CMS with admin dashboard, roles, MFA, audit log, draft and preview workflow, version history and media library.
- Enquiry inbox with status tracking, notes, retention and restricted export.
- SEO and social metadata, sitemap and robots rules; optional privacy-conscious analytics.
- Deployment, HTTPS, monitoring, backups with restore testing, and operating documentation.

### 11.2 Out of scope for version 1

- Customer login, SaaS billing or the Nexora Business application itself.
- E-commerce checkout, payments, wallets, lending or custody of funds.
- Customer-facing portal, job applicant tracking, or any public admin tools.
- AI chatbot that makes commitments or binding quotations.
- Multilingual interface.
- Visual page builder that lets editors change brand tokens or layout code.
- Multi-site or multi-tenant CMS, customer-managed content, approval chains beyond Editor to Administrator.
- Unverified claims about certifications, clients, awards, offices or partnerships.

---

## 12. Delivery roadmap

| Phase | Focus | Exit gate |
|---|---|---|
| 1. Discovery | Confirm business details, services, audience, copy, domain, CMS users and budget | Founder approves scope |
| 2. UI/UX | Wireframes, design system, responsive page designs, form states, admin dashboard needs | Mobile and desktop designs approved |
| 3. CMS and content model | Select CMS by proof of concept; define content types, roles, permissions and workflow; set up authentication and database | Content model and permission matrix approved |
| 4. Website build | Shared layout, public pages rendered from CMS, responsive UI, content entry | Routes and interactions reviewed |
| 5. Enquiry workflow and admin | Validation, enquiry storage and inbox, spam controls, audit log, backups, privacy | End-to-end submission and role tests pass |
| 6. QA, training and launch | Accessibility, SEO, performance, security, role testing, editor training, deployment | Acceptance criteria signed off |
| 7. Iteration | Review enquiries and usage; improve from evidence | Changes prioritised from real data |

### Possible later work (not committed)

These are ideas to evaluate after launch and real data, not part of version 1: portfolio and case studies once permission exists, an external CRM if the enquiry inbox becomes limiting, WhatsApp contact once a business number is confirmed, additional languages, and a path from Nexora Business interest sign-ups to a pilot programme.

---

## 13. Constraints

| Area | Constraint |
|---|---|
| People | Solo founder; limited time for operations and maintenance |
| Budget | Affordable hosting, database, storage and email; a CMS adds recurring running cost compared with static files |
| Connectivity | Many visitors on phones and constrained connections |
| Legal | Sierra Leone data protection, consumer, electronic communications and tax requirements to be confirmed with qualified local advice |
| Trust | New company with no verified track record; claims must be conservative and provable |
| Technical | Next.js with TypeScript, a CMS with admin dashboard, managed PostgreSQL, S3-compatible media storage (see `AGENTS.md` section 3) |

---

## 14. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Overstating capabilities or product readiness | Loss of trust; possible legal exposure | Truthful status labels, permission-gated claims, approval workflow, AC-006 checks |
| Enquiry data exposed or misused | Privacy harm; reputational damage | Minimal collection, role-based access, MFA, audit log, retention rules, no real data outside production |
| Admin account compromise | Defaced site; leaked leads | Mandatory Administrator MFA, lockout, secure sessions, least privilege, monitoring, tested recovery |
| Founder locked out of admin | Cannot publish or read enquiries | Two Administrator accounts or documented emergency recovery |
| CMS outage or misconfiguration | Site down or stale | Static or cached public pages, monitoring, backups, rollback |
| Lost leads from email failure | Missed business | Store first, notify second, flag failed notifications |
| Running cost higher than expected | Strain on budget | Confirm hosting and database budget during discovery; record renewals |
| Maintenance burden on a solo founder | Neglected updates, security debt | Boring technology, documentation, automated dependency checks, clear handover |
| Poor performance on slow networks | Visitors leave | Performance budgets, lightweight pages, real-device testing |
| Accessibility gaps in CMS-provided admin UI | Editors with disabilities blocked | Evaluate during CMS selection; work around gaps where feasible |
| Unconfirmed legal and privacy obligations | Non-compliance | Obtain local legal advice before publishing privacy and terms pages |

---

## 15. Assumptions and open decisions

| Decision | Current assumption | To confirm |
|---|---|---|
| Company status | Proposed startup | Legal name and registration status |
| Target audience | SMEs in Sierra Leone | First segment |
| Language | English only at launch | Approve content language |
| Contact | Not yet supplied | Business email, phone, optional WhatsApp |
| Address | Not published until confirmed | Whether a public address is needed |
| Portfolio | No unverified projects | Approved case studies and permissions |
| Nexora Business | Planned product | Actual status and roadmap |
| CMS | Protected CMS with admin dashboard; Payload CMS recommended | Final product after proof of concept; hosting and database budget |
| Admin users and roles | Founder as Administrator; Editor and Handler added as needed | Who needs access and which role |
| Editor publishing | Editors submit; Administrator publishes | Whether Editors may publish directly |
| Pricing | Quote-based unless approved | Whether prices will be public |
| Analytics | Optional | Tool and privacy approach |
| Domain | Unconfirmed | Availability and preferred domain |
| Retention | Enquiries 12–24 months; audit log 12 months (proposed) | Approved periods after local legal advice |

Do not treat an assumption as a decision. Ask the founder, then update this table, the SRS and `AGENTS.md` together.

---

## 16. Definition of product success at launch

Launch is approved only when all Must requirements are implemented, acceptance tests AC-001 to AC-024 pass, content and notices are approved, enquiry delivery works end to end, the CMS and admin dashboard have role-based access, MFA, audit logging and tested backups, authorised editors can manage content and enquiries without developer help, security and backup responsibilities are documented, the production domain and HTTPS work, and the founder approves the final public presentation.

---

## 17. Glossary

| Term | Meaning |
|---|---|
| SRS | System Requirements Specification, the detailed requirements baseline |
| CMS | Content Management System; stores and publishes website content |
| Admin dashboard | The protected `/admin` interface for managing content, enquiries, users and settings |
| Enquiry | A contact, project or product-interest submission from a visitor |
| Draft / In review / Published / Archived | Content lifecycle statuses; only Published is public |
| Planned / Pilot / Available | Allowed product availability labels |
| Permission confirmed | Recorded approval to publish a client name, testimonial, logo or portfolio entry |
| MFA | Multi-factor authentication |
| Revalidation | Refreshing cached public pages after content is published |
| Audit log | Append-only record of admin activity |
| ADR | Architecture Decision Record |

---

## 18. Related documents

| Document | Purpose |
|---|---|
| `Nexora_Technologies_Public_Website_SRS_v1_1.docx` | Full requirements, acceptance criteria and decisions |
| `AGENTS.md` | Engineering and AI agent development rules |
| `docs/content-model.md` | Fields and rules for every content type (to be created) |
| `docs/roles-and-permissions.md` | Role matrix and rationale (to be created) |
| `docs/admin-guide.md` | Editor and Administrator guide (to be created) |
| `docs/privacy-and-retention.md` | Data inventory and retention procedure (to be created) |
