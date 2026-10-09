import { Injectable, signal } from '@angular/core';
export interface PracticeRecord {
  draft: string;
  complete: boolean;
  updatedAt?: string;
}
const KEY = 'learning-app-test-practice-v1';
const LAST = 'learning-app-last-lesson-v1';
@Injectable({ providedIn: 'root' })
export class PracticeStore {
  readonly records = signal<Record<string, PracticeRecord>>({});
  readonly lastLesson = signal('');
  readonly error = signal('');
  constructor() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) ?? '{}');
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const entries = Object.entries(data).filter(([id, value]) => {
          const record = value as PracticeRecord;
          return (
            /^(fr|tr|ru|it)-\d{2}$/.test(id) &&
            record &&
            typeof record.draft === 'string' &&
            typeof record.complete === 'boolean'
          );
        });
        this.records.set(Object.fromEntries(entries) as Record<string, PracticeRecord>);
      }
      const last = localStorage.getItem(LAST) ?? '';
      if (/^(fr|tr|ru|it)-\d{2}$/.test(last)) this.lastLesson.set(last);
    } catch {
      this.error.set('Saved practice could not be loaded. You can continue in this session.');
    }
  }
  visit(id: string) {
    this.lastLesson.set(id);
    try {
      localStorage.setItem(LAST, id);
    } catch {
      this.error.set(
        'Browser storage is unavailable. Resume information is kept for this session.',
      );
    }
  }
  save(id: string, draft: string, complete: boolean) {
    this.records.update((records) => ({
      ...records,
      [id]: {
        draft,
        complete: complete || records[id]?.complete || false,
        updatedAt: new Date().toISOString(),
      },
    }));
    try {
      localStorage.setItem(KEY, JSON.stringify(this.records()));
      this.error.set('');
    } catch {
      this.error.set(
        'Your draft is active for this session but could not be saved in this browser.',
      );
    }
  }
}
