# Learning App

Personalized language learning grounded in the learner's interests, environment, and mature communication style. Learners listen, read, study useful grammar, write, and speak when ready, with adjustable assistance.

Repository: https://github.com/narnagas/learning-app

## Project layout

| Location | Purpose |
| --- | --- |
| `apps/learning-app/` | Shared Angular application and iOS/Android projects |
| `content/` | Versioned lesson definitions and content schemas |
| `deploy/docker/` | Planned container build and runtime configuration |
| `deploy/iis/` | Planned IIS configuration and deployment scripts |
| `.github/workflows/` | Planned GitHub build and validation workflows |
| `docs/` | Product requirements and architecture guidance |

See [product requirements](docs/product-requirements.md) and [folder structure](docs/folder-structure.md).

## Run locally

Use Node.js 24.15 or newer in the Node 24 release line. From `apps/learning-app/`, run `npm ci`, then `npm start`. Open http://localhost:4200. Run `npm run build` for a production build in `apps/learning-app/dist/learning-app/browser/`.

The Angular application includes a responsive language library and 10 synthetic test lessons each for French, Turkish, Russian, and Italian. Lessons exercise WAV playback, transcript/meaning controls, adjustable assistance, grammar recall, writing drafts, local progress, and optional browser recording. Test lessons do not define the final curriculum. Native mobile projects, backend services, IIS configuration, and workflows remain planned.

Open `/lessons/fr`, `/lessons/tr`, `/lessons/ru`, or `/lessons/it` to practice. Drafts and completion records are saved in this browser's local storage when you save or mark practiced. Unsaved edits are discarded when changing lessons. Voice recordings stay only in the page session and are not uploaded. Browser recording uses the browser's supported format, not a WAV conversion pipeline.

See [test fixture generation and verification](tools/test-lessons/README.md).

Open `/progress` for practice counts by language, a link to resume the last opened lesson, and a portfolio of saved writing. These counts describe practice activity, not language proficiency. See [practice dashboard behavior](docs/progress.md).

Lesson audio uses language-specific neural voices, served as pre-generated WAV files. Playback does not contact the speech provider. The separate generation tool uses Microsoft Edge speech through `edge-tts` for this prototype; a supported production provider remains to be selected.

## Personalize practice

Open `/profile` to choose your everyday context, interests, conversation depth, and assistance. Optional introductory writing prompts are offered in your native language. Explicitly selected preferences adapt writing guidance and hints; responses are stored locally without automatic analysis. You can review, edit, or clear the profile. See [learning-profile behavior](docs/learning-profile.md).

## Run with Docker

From the repository root, run `docker compose -f deploy/docker/compose.yaml up --build -d`, then open http://localhost:8080/languages. See [Docker instructions](deploy/docker/README.md) for lifecycle commands and the optional read-only WAV library mount.
