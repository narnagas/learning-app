import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PracticeStore } from '../../core/storage/practice-store';
import { ProfileStore } from '../../core/learning/learning-profile';
interface Lesson {
  id: string;
  language: string;
  title: string;
}
@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class ProgressPage {
  readonly store = inject(PracticeStore);
  readonly profile = inject(ProfileStore);
  readonly lessons = signal<Lesson[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly languages = [
    { code: 'fr', name: 'French' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ru', name: 'Russian' },
    { code: 'it', name: 'Italian' },
  ];
  readonly practiced = computed(
    () => this.lessons().filter((item) => this.store.records()[item.id]?.complete).length,
  );
  readonly drafts = computed(
    () => this.lessons().filter((item) => this.store.records()[item.id]?.draft.trim()).length,
  );
  readonly portfolio = computed(() =>
    this.lessons()
      .filter((item) => this.store.records()[item.id]?.draft.trim())
      .sort((a, b) => this.dateValue(b.id) - this.dateValue(a.id)),
  );
  readonly resume = computed(() =>
    this.lessons().find((item) => item.id === this.store.lastLesson()),
  );
  readonly recommended = computed(() => {
    const language = this.profile.profile()?.targetLanguage ?? 'fr';
    return this.lessons().find(
      (item) => item.language === language && !this.store.records()[item.id]?.complete,
    );
  });
  constructor() {
    fetch('/test-lessons/index.json')
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        this.lessons.set(data.lessons);
      })
      .catch(() => this.error.set('Could not load the lesson library. Refresh to try again.'))
      .finally(() => this.loading.set(false));
  }
  languageName(code: string) {
    return this.languages.find((item) => item.code === code)?.name ?? code;
  }
  count(code: string) {
    return this.lessons().filter(
      (item) => item.language === code && this.store.records()[item.id]?.complete,
    ).length;
  }
  total(code: string) {
    return this.lessons().filter((item) => item.language === code).length;
  }
  private dateValue(id: string) {
    const value = Date.parse(this.store.records()[id]?.updatedAt ?? '');
    return Number.isFinite(value) ? value : 0;
  }
  savedDate(id: string) {
    const value = this.dateValue(id);
    return value ? new Date(value).toLocaleDateString() : 'Earlier practice';
  }
}
