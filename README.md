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

The Angular application includes routing and a responsive language-selection screen. Selection lasts for the current page session; lesson content and progress persistence are not implemented yet. Native mobile projects, backend services, IIS configuration, and workflows remain planned.

## Run with Docker

From the repository root, run `docker compose -f deploy/docker/compose.yaml up --build -d`, then open http://localhost:8080/languages. See [Docker instructions](deploy/docker/README.md) for lifecycle commands and the optional read-only WAV library mount.
