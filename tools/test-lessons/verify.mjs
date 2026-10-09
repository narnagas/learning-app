import assert from 'node:assert/strict';

const base = process.argv[2] ?? 'http://localhost:8080';
const response = await fetch(`${base}/test-lessons/index.json`);
assert.equal(response.status, 200);
const { lessons } = await response.json();
assert.equal(lessons.length, 40);
assert.equal(new Set(lessons.map(item => item.id)).size, 40);
for (const language of ['fr','tr','ru','it']) assert.equal(lessons.filter(item => item.language === language).length, 10);
for (const lesson of lessons) {
  const audio = await fetch(`${base}${lesson.audio}`);
  assert.equal(audio.status, 200, lesson.id);
  const bytes = Buffer.from(await audio.arrayBuffer());
  assert.equal(bytes.toString('ascii',0,4), 'RIFF', lesson.id);
  assert.equal(bytes.toString('ascii',8,12), 'WAVE', lesson.id);
  let offset = 12, samples, format;
  while (offset + 8 <= bytes.length) {
    const chunk = bytes.toString('ascii',offset,offset+4), size = bytes.readUInt32LE(offset+4);
    assert.ok(offset + 8 + size <= bytes.length, `${lesson.id}: truncated chunk`);
    if (chunk === 'fmt ') format = bytes.subarray(offset+8,offset+8+size);
    if (chunk === 'data') samples = bytes.subarray(offset+8,offset+8+size);
    offset += 8 + size + (size % 2);
  }
  assert.equal(format?.readUInt16LE(0), 1, `${lesson.id}: expected PCM`);
  assert.ok(samples?.length > format.readUInt32LE(8), `${lesson.id}: expected >1 second`);
  assert.ok(samples.some(value => value !== 0), `${lesson.id}: silent audio`);
  const range = await fetch(`${base}${lesson.audio}`, {headers:{Range:'bytes=0-43'}});
  assert.equal(range.status,206,`${lesson.id}: seeking support`);
  assert.equal((await range.arrayBuffer()).byteLength,44);
}
console.log('Passed: 40 unique lessons, 10 per language, valid non-silent PCM WAVs, and HTTP byte-range playback.');
