# Learning App

Angular 22 application with standalone components and lazy-loaded routing.

From this directory:

- `npm ci` installs the locked dependencies.
- `npm start` serves the app at http://localhost:4200.
- `npm run build` creates the production bundle in `dist/learning-app/browser/`.

Use Node.js 24.15 or newer within the Node 24 release line.

The initial `/languages` screen supports French, Turkish, and Russian. Selection is temporary and resets on refresh. Lessons, persistence, accounts, and native packaging are future work.

See `../../docs/folder-structure.md` for responsibilities of the shared application and platform folders. No automated test runner has been configured yet; validation currently uses production compilation and browser checks.
