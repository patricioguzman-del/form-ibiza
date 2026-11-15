# FORM | ibiza website: rules for Claude Code

You are building the new website for FORM | ibiza (formibiza.com), an independent luxury real estate advisory in Ibiza. It replaces a Wix site.

## The owner of this project does not code
- Explain everything in plain language. No jargon without a one-line explanation.
- Short updates. Bullet points. One decision at a time.
- When you need something (an account, a key, a file), say exactly what and where to click.

## Source of truth, in this order
1. `docs/04-architecture.md`: the technical plan and the 10 milestones.
2. `docs/03-design-system.md`: tokens and patterns. No colour, font or spacing outside it.
3. `docs/design/*.dc.html`: the approved page designs (direction A), desktop and mobile. Match them closely. Open them as HTML to read layout, sizes and copy. Ignore the `<x-dc>`, `<helmet>` and `data-dc-script` wrapper: it's the design tool's format.
4. `docs/01-brand-dna.md`: the brand. Section 8 is non-negotiable.
5. `docs/02-content-inventory.md`: all listings, fields, data errors and the redirect map (section 8).

## How we work
- One milestone at a time (architecture section 10). At the end of each: a Vercel preview link, a plain summary of what's done, what you need from the owner. Then STOP and wait for approval.
- Commit after every working step with a clear message.
- Never invent content: prices, names, roles, legal text. Use [BRACKETED PLACEHOLDERS].
- Accessibility WCAG 2.1 AA from the start. Check every page at 390px wide.
- When unsure about a design choice, choose the quieter, simpler option.
- If a problem resists two attempts, say so and suggest switching to a stronger model.

## Never
- New colours, fonts, rounded corners, shadows, gradients or icon sets.
- Headings above 30px.
- Publish private listings to the browser for visitors who aren't approved.
- Touch the live domain (formibiza.com) or DNS before milestone 9, and then only with explicit approval.
