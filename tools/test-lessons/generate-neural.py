"""Regenerate original public test text with neural voices; never send user recordings."""
import asyncio
import json
from pathlib import Path
import subprocess
import tempfile
import wave

import edge_tts

ROOT = Path('/workspace')
INDEX = ROOT / 'apps/learning-app/public/test-lessons/index.json'
VOICES = {'fr': 'fr-FR-DeniseNeural', 'tr': 'tr-TR-EmelNeural', 'ru': 'ru-RU-SvetlanaNeural'}


async def main():
    payload = json.loads(INDEX.read_text(encoding='utf-8'))
    available = {voice['ShortName'] for voice in await asyncio.wait_for(edge_tts.list_voices(), timeout=45)}
    for voice in VOICES.values():
        if voice not in available:
            raise RuntimeError(f'Expected neural voice is unavailable: {voice}')
    with tempfile.TemporaryDirectory() as staging:
        outputs = []
        for lesson in payload['lessons']:
            voice = VOICES[lesson['language']]
            source = Path(staging) / f"{lesson['id']}.mp3"
            output = Path(staging) / f"{lesson['id']}.wav"
            for attempt in range(3):
                try:
                    await asyncio.wait_for(edge_tts.Communicate(lesson['transcript'], voice, rate='-8%').save(str(source)), timeout=60)
                    break
                except Exception:
                    if attempt == 2:
                        raise
                    await asyncio.sleep(2 * (attempt + 1))
            subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source), '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', str(output)], check=True)
            with wave.open(str(output), 'rb') as audio:
                if audio.getnframes() < audio.getframerate() or audio.getsampwidth() != 2:
                    raise RuntimeError(f"Invalid generated audio: {lesson['id']}")
            lesson['voice'] = voice
            lesson['audioEngine'] = 'Microsoft Edge neural TTS (test generation)'
            # A different public URL prevents cached robotic audio from being reused.
            lesson['audio'] = f"/test-lessons/audio/{lesson['language']}/{lesson['id']}-neural.wav"
            outputs.append((output, ROOT / 'apps/learning-app/public' / lesson['audio'].lstrip('/')))
            print(f"Generated {lesson['id']} with {voice}", flush=True)
        # Keep the previous working index intact if any synthesis request fails.
        for output, destination in outputs:
            destination.write_bytes(output.read_bytes())
        payload['version'] = 2
        payload['generator'] = 'Microsoft Edge neural TTS via edge-tts; 24 kHz mono PCM WAV'
        for language in VOICES:
            path = ROOT / f'content/manifests/{language}/test-lessons.json'
            path.write_text(json.dumps([lesson for lesson in payload['lessons'] if lesson['language'] == language], ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        INDEX.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('Published 30 neural WAVs and updated all lesson manifests.', flush=True)


if __name__ == '__main__':
    asyncio.run(main())
