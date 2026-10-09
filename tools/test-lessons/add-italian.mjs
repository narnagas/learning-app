import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { italianRows } from './italian.mjs';
const path = 'apps/learning-app/public/test-lessons/index.json';
const payload = JSON.parse(readFileSync(path, 'utf8'));
const lessons = italianRows.map(([title, transcript, meaning, grammar, prompt, cloze, answer], index) => {
  const id = `it-${String(index + 1).padStart(2, '0')}`;
  return { id, language:'it', title, transcript, meaning, grammar, prompt, cloze, answer, audio:`/test-lessons/audio/it/${id}-neural.wav`, fixture:true };
});
payload.lessons = [...payload.lessons.filter(item => item.language !== 'it'), ...lessons];
mkdirSync('content/manifests/it', { recursive:true });
writeFileSync('content/manifests/it/test-lessons.json', JSON.stringify(lessons,null,2)+'\n');
writeFileSync(path,JSON.stringify(payload,null,2)+'\n');
console.log('Added 10 Italian fixtures; generate Italian neural audio before deployment.');
