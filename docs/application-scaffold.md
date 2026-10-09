# Shared learning application

The Angular application will be generated in this directory. iOS and Android projects will share its learning experience through a mobile packaging framework selected later.

- `src/app/core/`: application-wide services, including audio, adaptive learning, authentication, messaging, notifications, storage, and platform integration.
- `src/app/features/`: user-facing learning and conversation features.
- `src/app/shared/`: reusable components, models, and utilities.
- `src/environments/`: non-secret environment configuration.
- `public/`: public static assets shipped with the app. Do not place private recordings or the source WAV library here.
- `ios/` and `android/`: reserved native projects and platform configuration.

Directory placeholders preserve the intended structure in Git. They do not represent implemented features.
