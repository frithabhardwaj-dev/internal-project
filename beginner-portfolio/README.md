# Personal portfolio assessment

A student portfolio with five coursework project entries, project search, technology filtering, light/dark mode and an API chatbot interface.

**Status: partially personalised starter.** Fritha's public profile, portfolio URL, quiz link and reading-list links have been added. A photograph, three project links/details, API credentials and final deployment verification are still needed.

Live portfolio URL: https://portfolio-portfolio-teal.vercel.app/

## Technologies

HTML, CSS, JavaScript and a small Node.js server function. Gemini REST is the example chatbot provider. Vercel is the intended deployment platform. No framework, database or external npm package is used.

## Features

- Home, About Me, Skills, Projects, Contact and AI Chatbot sections.
- Five required project cards, with a place for their repository and live links.
- Search by project name or technology, combined technology filter, result count and empty state.
- Light/dark toggle with browser preference storage when available.
- A chatbot request to /api/chat, with portfolio context, loading feedback and useful failure messages.

## Run locally

Extract the ZIP. Open the extracted folder in Cursor. Install Node.js 24 if necessary, then run:

```text
npm start
```

Open http://localhost:3000. No npm install is needed. See START-HERE.md for personalisation, API setup and Vercel steps.

## Files to understand

| File | Purpose |
|---|---|
| index.html | Website structure and forms |
| style.css | Responsive layout and light/dark colours |
| data.js | Public profile, skills and five project entries; edit this first |
| script.js | Display data, search/filter, theme toggle and chat form |
| api/chat.js | Server function that calls the chatbot provider |
| dev.js | Local server for the website and API endpoint |
| .env.example | Empty local settings template; never commit real secrets |
| vercel.json | Deployment configuration |

## Chatbot setup

Copy .env.example to .env.local, fill GEMINI_API_KEY and GEMINI_MODEL, then restart the server. On Vercel, set those variables in the project settings instead. Keep the real key out of public files and GitHub. Confirm Gemini matches the API taught in class.

## Screenshots

Add your own final desktop/mobile screenshots and update this README to embed them. None of the starter previews proves personalisation, live deployment or API success.

## Limitations

The chatbot answers each question independently and needs a configured API account with available quota. AI answers still need checking. This starter has no durable public-API rate limiter. The existing Lecture 9 source was unavailable, so the owner must bring across their original verified content.

See TESTING.md for checks already performed and the remaining assessment steps.
