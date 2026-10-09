# Synthetic lesson fixtures

These 30 original short lessons exercise playback, transcripts, adjustable assistance, grammar recall, writing, and optional local recording. They do not define the curriculum or the final personalization experience. Translations use English as a temporary test interface language, not as the only supported native language.

Generate the WAV files and manifests from the repository root:

```powershell
docker build -t learning-app:test-audio -f tools/test-lessons/Dockerfile tools/test-lessons
docker run --rm --mount "type=bind,source=$($PWD.Path),target=/workspace" learning-app:test-audio
```

The generator uses language-specific eSpeak NG voices, validates RIFF/WAVE headers, and writes public test audio under `apps/learning-app/public/test-lessons/`. It also writes per-language source manifests under `content/manifests/`. Rebuild the application container after generation.

The synthetic voices are robotic. Audio and teaching content require native-speaker review before production use. Recordings made by learners stay in the current browser session and are never sent to a service. Browser microphone permission is requested only after the learner clicks Record.

Verify all 30 files served by the running application:

```powershell
node tools/test-lessons/verify.mjs http://localhost:8080
```

This checks lesson counts, unique IDs, PCM WAV structure, non-silent sample data, minimum duration, and HTTP byte-range responses. Browser checks additionally cover assistance controls, recall feedback, writing/progress persistence, and navigation. Actual microphone capture requires a device and user-granted browser permission. Writing review is a self-review prompt; no AI grammar or pronunciation grading is implemented.
