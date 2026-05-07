# TRINEXTA — Design System & Creative Direction

Version 1.0 — March 2026

---

# 1. Brand Positioning

TRINEXTA is a modern IT managed services and cybersecurity company based in Île-de-France.

The company provides:

- managed IT services,
- proactive support,
- cybersecurity,
- Microsoft 365 administration,
- cloud infrastructure,
- business software assistance.

The brand positioning must feel:

- premium,
- light
- modern,
- calm,
- reliable,
- technical,
- enterprise-grade,
- human,
- operational.

TRINEXTA should NOT look like:

- a generic MSP website,
- a WordPress agency,
- a local computer repair shop,
- a cheap cybersecurity startup,
- a flashy AI company.

The visual identity should communicate:

> “Your IT infrastructure is under control.”

---

# 2. Emotional Direction

The website should evoke:

- trust,
- stability,
- clarity,
- competence,
- calmness,
- professionalism,
- operational excellence.

The user should feel:

- reassured,
- guided,
- supported,
- protected,
- confident.

The design must balance:

- human warmth,
- technical sophistication.

---

# 3. Visual References

Primary references:

- https://stripe.com
- https://linear.app
- https://vercel.com
- https://resend.com
- https://raycast.com

Visual balance:

- 60% Stripe
- 30% Linear
- 10% Vercel

---

# 4. What To Take From Each Reference

## Stripe

Take inspiration from:

- Light colored UI
- layout sophistication,
- storytelling structure,
- premium gradients,
- large spacing,
- visual hierarchy,
- smooth transitions,
- section rhythm,
- modern enterprise aesthetic.

Avoid:

- excessive color usage,
- overly abstract visuals.

---

## Linear

Take inspiration from:

- UI elegance,
- fake interactive interfaces,
- subtle animations,
- premium minimalism,
- calm visual rhythm,
- translucent cards,
- operational dashboards,
- issue/ticket inspired UI.

Avoid:

- developer-only aesthetics,
- overly black interfaces,
- too much terminal style.

Avoid:

- overly cold interfaces.

---

# 5. Design Philosophy

The website should feel like:

- a premium software platform,
- an infrastructure control center,
- a modern operational dashboard.

The website must NOT feel like:

- a marketing-heavy agency,
- a template website,
- a “cyberpunk” security company.

Design should remain:

- believable,
- professional,
- elegant,
- restrained.

---

# 6. Visual Style

## General Style

- Modern SaaS enterprise design
- Sophisticated but minimal
- Soft depth
- Light backgrounds
- Light glassmorphism
- Subtle lighting effects
- Elegant dark sections
- Calm gradients
- Cinematic spacing

## 3D Elements

Inspiration: Stripe.com

Use:

- abstract geometric shapes (spheres, blobs, soft polyhedra),
- premium gradient fills (#5c92b8, #89b4d6, #d8ecff tones),
- subtle ambient glow behind shapes,
- very low opacity — decorative, never dominant,
- placed in Hero background and dark sections.

Avoid:

- heavy 3D renders,
- realistic materials,
- obvious WebGL demos,
- shapes that compete with content.

---

# 7. Color System

Primary colors:

- #0a233e
- #5c92b8

Extended palette:

- #081726
- #102f4d
- #89b4d6
- #d8ecff
- #f6fbff

Neutral colors:

- #ffffff
- #f8fafc
- #e2e8f0
- #94a3b8
- #1e293b

Accent usage:

- subtle blue glows,
- soft gradient highlights,
- transparent borders,
- low-opacity overlays.

Avoid:

- neon colors,
- cyberpunk visuals,
- aggressive saturation.

---

# 8. Typography

Preferred typography:

- Inter
- Geist

Alternative:

- Satoshi

Typography principles:

- modern,
- highly readable,
- elegant,
- neutral,
- technical.

Avoid:

- Poppins,
- Montserrat,
- over-rounded fonts.

---

# 9. Spacing Principles

The interface should breathe.

Use:

- large vertical spacing,
- clean content separation,
- wide layouts,
- minimal clutter.

The website should feel:

- calm,
- structured,
- premium.

Avoid:

- dense layouts,
- compact sections,
- excessive text blocks.

---

# 10. Motion Design

Animations must be:

- subtle,
- smooth,
- premium,
- restrained.

Preferred animations:

- fade-up reveals,
- opacity transitions,
- soft parallax,
- mouse-reactive gradients,
- floating ambient lights,
- subtle hover states,
- smooth card transitions.

Avoid:

- aggressive animations,
- excessive parallax,
- flashy effects,
- exaggerated motion,
- “agency-style” animations.

Motion should support:

- clarity,
- elegance,
- perceived quality.

---

# 11. UI Components

## Buttons

Style:

- premium SaaS,
- medium radius,
- subtle shadows,
- soft hover glow,
- elegant transitions.

Primary CTA:

- dark blue background,
- white text,
- soft gradient hover.

Secondary CTA:

- transparent,
- border-based,
- subtle hover fill.

---

## Cards

Cards should:

- feel lightweight,
- have subtle depth,
- soft borders,
- low-opacity backgrounds,
- premium spacing.

Use:

- slight translucency,
- subtle blur sparingly.

Avoid:

- hard shadows,
- thick borders,
- overly rounded cards.

---

## Navigation

Navigation should feel:

- clean,
- premium,
- enterprise-grade.

Behavior:

- sticky on scroll,
- subtle transparency,
- blur background when scrolling.

---

# 12. Homepage Experience

The homepage should follow a narrative flow.

---

## Section 1 — Hero

### Left side

- strong headline,
- reassuring subheadline,
- CTA buttons,
- trust indicators,
- partner logos,
- quick proof points.

### Right side

An interactive fake chat interface inspired by Linear's Copilot/AI assistant — adapted to TRINEXTA's IT managed services context.

#### Component: Assistant TRINEXTA

Structure:
- header: "Assistant TRINEXTA" with a subtle online status indicator,
- a scrollable conversation thread mixing system events and user/assistant turns,
- a text input field at the bottom (functional — user can type),
- preset suggestion chips above the input (e.g. "Statut backups", "Alertes actives", "Mon M365").

Behavior:
- system events auto-appear on load with a slight stagger animation (e.g. "Backup complété ✓", "Alerte résolue ✓"),
- when user types or clicks a chip, a pre-scripted response appears after a short realistic delay (typing indicator first),
- responses are calm, professional, reassuring — written in French,
- no more than 3–4 exchanges visible at once (scrolls naturally).

Example scripted exchanges:
- "Statut backups" → "Tous les backups sont nominaux. Dernier run : aujourd'hui à 03h14. Aucune erreur détectée."
- "Alertes actives" → "1 alerte en cours de traitement : tentative de connexion inhabituelle sur le poste de M. Dupont. Isolement automatique effectué à 09:47."
- "Mon M365" → "Votre tenant Microsoft 365 est synchronisé. 0 licences inactives. Dernière vérification : il y a 12 minutes."

Style:
- Light background card with subtle border,
- Inter/Geist font,
- calm blue tones (#5c92b8, #0a233e) for assistant messages,
- neutral gray for system events,
- dark blue for user messages,
- smooth message appear animations (fade-up),
- typing indicator: three animated dots.

The UI should feel:

- real,
- believable,
- calm,
- premium.

NOT:

- futuristic sci-fi,
- hacker aesthetic,
- fake Hollywood cybersecurity UI,
- aggressive chatbot.

---

## Example Dashboard Events

- Suspicious login blocked
- Backup completed successfully
- Ticket resolved in 4 minutes
- Device updated automatically
- Monitoring alert detected
- Endpoint secured
- Microsoft 365 synchronization completed

---

# 13. Service Sections

Service cards should feel:

- modern,
- operational,
- premium.

Use:

- icon,
- title,
- short explanation,
- clean hover state.

Avoid:

- oversized illustrations,
- generic stock icons.

---

# 14. Process Section

The “4-step process” is important.

Structure:
01 Audit
02 Securing
03 Deployment
04 Continuous Support

Style inspiration:

- Linear,
- Framer.

Should feel:

- structured,
- reassuring,
- operational.

---

# 15. Testimonials

Testimonials must feel:

- authentic,
- professional,
- credible.

Use:

- real names,
- company names,
- clean layouts,
- subtle cards.

Avoid:

- fake startup quotes,
- oversized quotation marks.

---

# 16. Partner Logos

Partner logos should:

- be monochromatic or softened,
- integrate naturally,
- avoid visual noise.

The section should feel:

- enterprise-grade,
- trustworthy.

---

# 17. Dark Mode Philosophy

Dark sections should:

- create depth,
- elevate premium perception,
- frame important content.

Dark mode should feel:

- elegant,
- soft,
- controlled.

Avoid:

- pure black,
- neon glows,
- gaming aesthetics.

---

# 18. Mobile Experience

Mobile experience is critical.

Mobile should feel:

- fast,
- minimal,
- premium.

Priorities:

- readability,
- spacing,
- CTA visibility,
- simplified interactions.

Avoid:

- oversized animations,
- cluttered mobile layouts.

---

# 19. UX Philosophy

The UX should communicate:

> “TRINEXTA s'occupe de la complexité pour vous.”

The experience should feel:

- frictionless,
- understandable,
- calm,
- guided.

Users should never feel:

- overwhelmed,
- lost,
- overloaded with technical jargon.

---

# 20. Anti-Patterns

DO NOT:

- create generic MSP aesthetics,
- use Elementor-style layouts,
- use stock-photo-heavy sections,
- overuse gradients,
- use neon cyberpunk visuals,
- create AI startup aesthetics,
- overload pages with text,
- use aggressive shadows,
- use futuristic hologram interfaces,
- create gaming-style UI,
- use flashy interactions.

---

# 21. Technical Frontend Direction

Recommended stack:

- Tailwind CSS
- TypeScript
- Framer Motion

Frontend should prioritize:

- performance,
- responsiveness,
- accessibility,
- clarity.

Target:

- Lighthouse 95+
- extremely fast loading,
- smooth interactions.

---

# 22. Final Creative Goal

The website should feel like:

- a premium infrastructure platform,
- a modern IT operations experience,
- a trustworthy technology partner.

The final perception should be:

> “TRINEXTA is modern, serious, highly capable, and operationally excellent.”
