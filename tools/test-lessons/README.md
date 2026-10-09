# Synthetic lesson fixtures

These 30 original short lessons exercise playback, transcripts, adjustable assistance, grammar recall, writing, and optional local recording. They do not define the curriculum or the final personalization experience. Translations use English as a temporary test interface language, not as the only supported native language.

## Natural test voices

The current lesson audio uses French Denise, Turkish Emel, and Russian Svetlana neural voices. Generation uses the third-party [edge-tts](https://github.com/rany2/edge-tts) client for Microsoft's online Edge speech service. Only the original public lesson text is sent for generation; no learner recordings or profiles are used. This is a prototype generation tool, not a supported production speech API.

Generate improved audio from the existing manifests:

```powershell
docker build -t learning-app:neural-audio -f tools/test-lessons/Dockerfile.neural tools/test-lessons
docker run --rm --mount "type=bind,source=$($PWD.Path),target=/workspace" learning-app:neural-audio
docker compose -f deploy/docker/compose.yaml up --build -d
```

The tool stages all 30 results before changing the lesson index. It converts speech to 24 kHz mono 16-bit PCM WAV, slows delivery by 8%, and uses new `-neural.wav` URLs to avoid replaying cached robotic files. Voice provenance is stored in the manifests. The app serves these files locally without a runtime cloud connection. For production, select a supported provider such as [Azure Speech](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support) and review voice quality and service terms.

## Original offline fixtures

The original eSpeak generator remains available as an explicit offline fallback. Running it resets manifests to the older robotic voices. Generate the original WAV files and manifests from the repository root:

```powershell
docker build -t learning-app:test-audio -f tools/test-lessons/Dockerfile tools/test-lessons
docker run --rm --mount "type=bind,source=$($PWD.Path),target=/workspace" learning-app:test-audio
```

The generator uses language-specific eSpeak NG voices, validates RIFF/WAVE headers, and writes public test audio under `apps/learning-app/public/test-lessons/`. It also writes per-language source manifests under `content/manifests/`. Rebuild the application container after generation.

The original eSpeak voices are robotic; neural voices are still synthetic. Audio and teaching content require native-speaker review before production use. Recordings made by learners stay in the current browser session and are never sent to a service. Browser microphone permission is requested only after the learner clicks Record.

Verify all 30 files served by the running application:

```powershell
node tools/test-lessons/verify.mjs http://localhost:8080
```

This checks lesson counts, unique IDs, PCM WAV structure, non-silent sample data, minimum duration, and HTTP byte-range responses. Browser checks additionally cover assistance controls, recall feedback, writing/progress persistence, and navigation. Actual microphone capture requires a device and user-granted browser permission. Writing review is a self-review prompt; no AI grammar or pronunciation grading is implemented.
