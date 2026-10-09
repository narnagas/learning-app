# Learning App

Angular 22 application with standalone components and lazy-loaded routing.

From this directory:

- `npm ci` installs the locked dependencies.
- `npm start` serves the app at http://localhost:4200.
- `npm run build` creates the production bundle in `dist/learning-app/browser/`.

Use Node.js 24.15 or newer within the Node 24 release line.

The `/languages` screen links to 10 synthetic test lessons per language at `/lessons/fr`, `/lessons/tr`, and `/lessons/ru`. These exercise audio, reading, grammar recall, writing, local progress, and optional browser recording. Accounts and native packaging remain future work. See `../../tools/test-lessons/README.md` for generation and verification.

See `../../docs/folder-structure.md` for responsibilities of the shared application and platform folders. No automated test runner has been configured yet; validation currently uses production compilation and browser checks.
