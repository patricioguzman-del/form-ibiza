# Phase 5: how to start the build

## One-time setup (about 15 minutes)

1. **Create a GitHub repository** called `form-ibiza` (private).
2. **Upload this whole folder** into it: `CLAUDE.md`, `START-HERE.md` and the `docs/` folder. On github.com: *Add file › Upload files*, drag everything in, then *Commit changes*.
3. **Open Claude Code** (claude.ai/code), choose the `form-ibiza` repository, and set the model to **Sonnet 5.5**.
4. **Paste the message below** as your first message.

## The message to paste

```
Read CLAUDE.md, then every file in docs/. Then start Milestone 1 from
docs/04-architecture.md section 10.

Before writing code, tell me in 5 bullets max:
- what you'll build in Milestone 1
- which accounts I need to create (Vercel, Sanity, Supabase, Resend) and when
- anything unclear in the docs

Then build Milestone 1, give me the preview link, and stop.
```

## After each milestone
- Open the preview link on your laptop **and** your phone.
- Reply with what to change, or "approved, next milestone".
- If Claude Code gets stuck twice on the same problem, switch the model to **Opus 5.5** for that problem, then back to Sonnet.

## Accounts you'll be asked for (all free to start, except Vercel Pro)
- **Vercel**: connect it to the GitHub repo. Pro plan ($20/month) before launch.
- **Sanity**: where the team will edit listings.
- **Supabase**: Private Office sign-ins and enquiry backup.
- **Resend**: sends the enquiry emails. Needs access to the domain's DNS later.

Use FORM's own email (e.g. info@formibiza.com) for these accounts, so the agency owns them, not you personally.
