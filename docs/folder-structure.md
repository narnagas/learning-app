# Folder structure

## Shared application

`apps/learning-app/src/app/core/` reserves these application-wide service areas:

| Directory | Responsibility |
| --- | --- |
| `audio/` | Playback, recording, conversion, and future encrypted-format support |
| `learning/` | Communication-profile adaptation and adjustable assistance |
| `auth/` | Account/session integration and role access |
| `messaging/` | Voice-message delivery integration |
| `notifications/` | Message, review, and session notification integration |
| `storage/` | Local progress, downloads, and synchronization |
| `platform/` | Browser and native-device capabilities |

`src/app/features/` reserves onboarding, language-library, lessons, practice, progress, conversations, tutors, downloads, and settings. Onboarding owns the optional native-language introductory conversation and profile controls. Lessons support listening, reading, grammar, and writing before optional speaking. Conversations covers voice messages and live audio/video; tutors covers live assessment and approval.

`src/app/shared/` holds reusable components, models, and utilities. `public/` holds distributable static assets; `src/environments/` holds non-secret environment configuration.

## Mobile

`apps/learning-app/ios/` and `apps/learning-app/android/` reserve native platform projects. Select the packaging framework before generating these projects.

## Content and operations

- `content/manifests/{fr,tr,ru}/`: lesson definitions, separate from audio files.
- `content/schemas/`: future manifest validation schemas.
- `deploy/docker/`: future Docker build/runtime files.
- `deploy/iis/`: future IIS hosting/deployment files.
- `.github/workflows/`: future CI workflows.
- `docs/`: requirements and development/deployment guidance.

Account, messaging, media storage, and tutor services need a backend. Its implementation and folder layout remain undecided. This scaffold does not select a backend technology, database, codec, or mobile framework.

Empty planned directories contain `.gitkeep` files so Git preserves them. Remove placeholders when actual files are added. No runnable application or deployment is included yet.
