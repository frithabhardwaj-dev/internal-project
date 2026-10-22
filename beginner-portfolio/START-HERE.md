# Start here

This is a simple starter for the Internal Assessment portfolio project. It is not ready to submit until you add the real details, links, photograph and API settings.

## 1. Open the project

Extract the ZIP first. In Cursor, choose File > Open Folder and select the extracted beginner-portfolio folder. Keep all files together.

The brief says to build on your Lecture 9 portfolio. That project's source was on your friend's computer and was not available for this ZIP. This version follows its blue, white and gold style. Copy across the verified text, photograph and links from the original portfolio before submission.

## 2. Add the student's information

Open data.js. Replace the PLACEHOLDER values and fill the empty strings:

- name, introduction, about and education: the student's own information.
- skills: keep only skills the student can explain.
- email: an address the student agrees to publish.
- github: the full GitHub profile URL.
- liveUrl: the final Vercel portfolio URL after deployment.
- photo: put a personal image in images/ and enter its relative path, such as images/profile.jpg.
- Each project's github: the real repository URL.
- Each project's live: the deployed application URL, if available.
- Each project's details: describe what the student actually did. Confirm its technologies too.

The five entries come from the assignment, not an inspection of the student's repositories. Verify the descriptions. The debugging work shown earlier was in Colab; do not label it as a Cursor exercise unless it was actually completed there.

The starter displays missing repository links as plain text instead of creating fake links. Replace all missing information before the assessment. Update the Book Reading List repository's own README to include its deployed URL.

## 3. Run the website

Use Node.js 24. In Cursor's terminal, inside this project folder, run:

```text
npm start
```

No npm install is needed because the project has no external packages. Open http://localhost:3000 in Chrome. Leave the terminal running. Press Ctrl+C to stop it.

Do not open index.html by double-clicking: this version imports JavaScript modules and uses a server endpoint. Use the local address above. A basic static Live Server extension will not run the chatbot function.

After editing data.js, restart npm start and refresh the browser. This keeps the chatbot's imported data in sync with the page.

## 4. Configure the chatbot

The PDF does not name the API taught in class. This ZIP includes a Gemini REST example; confirm that this is the correct provider. If the class used a different API, adapt api/chat.js to that provider before submission.

For Gemini:

1. Obtain your own API key through Google AI Studio. Do not send it to another chat.
2. Copy .env.example to a new file named .env.local in this project folder.
3. Fill GEMINI_API_KEY with the real key and GEMINI_MODEL with a model ID available to that account (for example, `gemini-3.8-flash` if Google AI Studio lists it for the key). Use the exact ID, without a models/ prefix. Both settings are required.
4. Restart npm start and ask a portfolio question.

If you see “The chatbot is not configured yet”, that is a real setup error, not a working chatbot. No fake or canned AI answers are included.

The browser sends a question to /api/chat. The server adds the public information from data.js, calls the provider and returns an answer. Only the server reads the secret API key. Each question is independent; conversation memory is not implemented.

Use only public information in data.js. Chat questions and portfolio information go to the AI provider. Set appropriate provider quota or spending limits before public use; the beginner version has no shared rate limiter or login.

## 5. GitHub and Vercel

1. Create the final portfolio repository and add these project files. Keep .gitignore: it excludes .env.local. Never upload the real environment file through GitHub's manual file-upload screen either.
2. Commit and push the files. Use real commit history; do not recreate earlier work.
3. In Vercel, import this repository. Select Other if asked for a framework. The included vercel.json sets the static root and the api/chat.js function. No frontend build is required.
4. In the Vercel project's environment settings, add GEMINI_API_KEY and GEMINI_MODEL. Enable them for the deployment environments you will test. Redeploy after changing them.
5. Open the live URL. Check the image, project links, filters, both themes and a real chatbot response there.
6. Put the live URL in data.js and README.md, then commit and deploy that update.

The chatbot needs Vercel Functions; GitHub Pages alone cannot run it.

## 6. Before submission

- Remove the PLACEHOLDER values and fill the photo, contact and all five repository links.
- Confirm that each repository opens and belongs to the intended project.
- Test search for Python, Quiz and Book; combine it with the technology filter and try a search with no matches.
- Test light/dark mode and narrow-screen layout.
- Ask the live chatbot about skills, Python programs, bug fixes, reading list and GitHub. Check its claims against data.js.
- Capture your own browser, GitHub and Vercel evidence.
- Complete the checklist in TESTING.md. The current ZIP contains implementation checks, not proof of a public deployment or a live API call.

## Explain the project in a demonstration

- HTML contains the sections and form controls.
- CSS controls layout and the two colour themes.
- data.js holds the public profile and projects in one place.
- script.js displays that information, filters the array and handles the chatbot form.
- api/chat.js holds the API request and reads its key from server environment variables.
- dev.js provides a small local preview server; Vercel runs the API function after deployment.

Official references: [Gemini API](https://ai.google.dev/api/generate-content), [Vercel Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js), [Vercel environment variables](https://vercel.com/docs/environment-variables).
