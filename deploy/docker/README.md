# Docker container

Run commands below from the repository root. Docker Desktop must be running with Linux containers enabled.

```powershell
docker compose -f deploy/docker/compose.yaml up --build -d
```

Open http://localhost:8080/languages. The container serves the production Angular build through Nginx, including direct navigation to Angular routes. It is separate from the Angular development server.

```powershell
docker compose -f deploy/docker/compose.yaml ps
docker compose -f deploy/docker/compose.yaml logs web
docker compose -f deploy/docker/compose.yaml down
```

Set `$env:APP_PORT = '8082'` before starting to use another local port. Port publishing defaults to localhost. IIS reverse-proxy and HTTPS configuration will be added separately.

## Optional WAV library

Keep distributable lesson audio outside the repository. To mount an existing library read-only:

```powershell
$env:AUDIO_LIBRARY_PATH = 'C:/LearningAudio'
docker compose -f deploy/docker/compose.yaml -f deploy/docker/compose.audio.yaml up --build -d
```

Files become available at `/audio/` with their relative folder paths intact, for example `/audio/fr/lesson-01.wav`. Nginx supports byte-range delivery for static files. Missing audio returns an HTTP error rather than the app HTML. The library directory must already exist; it is not created automatically.

Use this mount only for lesson media intended to be served publicly to app users. Private messages, recordings, authentication, and encrypted-audio key delivery need backend access controls and are not implemented by this static container.

## Build design

The Node 24 build stage runs `npm ci` using the committed lockfile and creates the Angular production bundle. The final image contains Nginx and compiled assets. Source WAV files and local dependencies are excluded from the build context. `/health` supplies the container health check.

Base image tags receive upstream updates. For a release, record or pin validated image digests. This container does not require IIS inside the image; IIS can later route requests to its local port.
