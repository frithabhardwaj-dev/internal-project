# Checks

This starter needs the student's real information, five project repository links, a photograph, a confirmed API provider, API settings and deployment before it meets the full PDF.

## Manual assessment checklist

- [ ] Personal details, education and skills are accurate; no PLACEHOLDER remains.
- [ ] The student's photograph loads.
- [ ] Public email and GitHub profile link are correct.
- [ ] All five project descriptions match actual work and use the correct technologies.
- [ ] All five repository links open. Live links work where available.
- [ ] The reading list repository README contains its deployed URL.
- [ ] Search Python, Quiz and Book; results update as typed.
- [ ] Search is case insensitive and ignores spaces at the ends.
- [ ] Search and technology filter combine; Clear filters restores five cards.
- [ ] An unmatched search shows the empty-state message.
- [ ] Light and dark modes work, remain readable and survive reload when storage is available.
- [ ] Page works at mobile and desktop widths; keyboard focus is visible.
- [ ] Live chatbot answers a question through the real provider API.
- [ ] Chatbot correctly describes the student's Python programs and actual bug fixes.
- [ ] Missing information produces an honest answer, not invented personal details.
- [ ] An API failure shows a useful error and the send button becomes usable again.
- [ ] Browser console shows JavaScript connected without unexpected errors.
- [ ] HTML checked with the Nu HTML Checker after final edits.
- [ ] GitHub contains no secret environment files or keys.
- [ ] Vercel deployment is public and the chatbot works there.
- [ ] Final README has the live URL and real screenshots.

## Automated implementation checks

Results of the local verification pass are recorded here before packaging. API response tests use a local stub, not a paid provider call. They cannot prove that an account key, quota, model or deployment works.

Local verification: 17 checks passed on 19 October 2026.

- API method/input validation, missing settings, invalid model, provider quota failure, missing response and network failure.
- A stubbed provider response confirmed that the server sends portfolio context, keeps the key out of the prompt and returns only answer text.
- Browser rendering of all five cards, Python/Quiz/Book searches, case/whitespace handling, empty state, combined filters and reset.
- Theme toggle, aria-pressed state and saved preference after reload.
- Chat error recovery, example-question controls, and a stubbed successful response rendered as text rather than HTML.
- No horizontal overflow at 1440px, 390px and 320px. No browser JavaScript exceptions in those scenarios.

The previews folder contains real screenshots of this incomplete starter, in light and dark themes. These are not evidence of the student's final deployment.

Not verified: real provider API call, account quota/model access, actual repository links, personal information, supplied photograph, Nu HTML validation or a Vercel deployment.
