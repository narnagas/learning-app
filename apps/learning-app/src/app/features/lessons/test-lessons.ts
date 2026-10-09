import { Component, computed, inject, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileStore, Assistance } from '../../core/learning/learning-profile';
import { PracticeStore } from '../../core/storage/practice-store';
import { combineLatest } from 'rxjs';

interface Lesson {
  id: string;
  language: string;
  title: string;
  transcript: string;
  meaning: string;
  grammar: string;
  prompt: string;
  cloze: string;
  answer: string;
  audio: string;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './test-lessons.html',
  styleUrl: './test-lessons.css',
})
export class TestLessons implements OnDestroy {
  readonly practiceStore = inject(PracticeStore);
  readonly profileStore = inject(ProfileStore);
  readonly practiceFocus = computed(() => {
    const profile = this.profileStore.profile();
    if (!profile) return '';
    const contexts: Record<string, string> = {
      everyday: 'a familiar situation from your day',
      work: 'your work or a conversation with a colleague',
      home: 'your home life or routines',
      travel: 'a journey or place you know',
      social: 'a conversation with a friend',
    };
    const depths = {
      everyday: 'Keep it concise: express one practical idea.',
      exploratory: 'Explain why it matters and add a follow-up question.',
      'in-depth': 'Explore a reason, a nuance, or another viewpoint using the language you know.',
    };
    return `Connect your response to ${contexts[profile.environment]}. ${depths[profile.depth]}${profile.interests.trim() ? ` If relevant, draw on your interest in ${profile.interests.trim()}.` : ''}`;
  });
  readonly language = signal('fr');
  readonly all = signal<Lesson[]>([]);
  readonly lessons = computed(() => this.all().filter((item) => item.language === this.language()));
  readonly languageName = computed(
    () =>
      ({ fr: 'French', tr: 'Turkish', ru: 'Russian', it: 'Italian' })[this.language()] ??
      'Language',
  );
  readonly selected = signal(0);
  readonly lesson = computed(() => this.lessons()[this.selected()]);
  readonly support = signal('guided');
  readonly transcriptVisible = signal(true);
  readonly meaningVisible = signal(false);
  readonly answer = signal('');
  readonly correct = signal(false);
  readonly answerFeedback = signal('');
  readonly draft = signal('');
  readonly writingFeedback = signal('');
  readonly message = signal('');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly audioError = signal('');
  readonly practices = this.practiceStore.records;
  readonly completed = computed(
    () => this.lessons().filter((item) => this.practices()[item.id]?.complete).length,
  );
  readonly recording = signal(false);
  readonly starting = signal(false);
  readonly recordingUrl = signal('');
  readonly recordingError = signal('');
  private recorder?: MediaRecorder;
  private stream?: MediaStream;
  private timer?: ReturnType<typeof setTimeout>;
  private destroyed = false;
  private generation = 0;
  private requestedLesson = '';

  constructor() {
    const assistance = this.profileStore.profile()?.assistance ?? 'guided';
    this.support.set(assistance);
    this.transcriptVisible.set(assistance !== 'independent');
    const route = inject(ActivatedRoute);
    combineLatest([route.paramMap, route.queryParamMap])
      .pipe(takeUntilDestroyed())
      .subscribe(([params, query]) => {
        this.language.set(params.get('language') ?? 'fr');
        this.requestedLesson = query.get('lesson') ?? '';
        this.choose(
          Math.max(
            0,
            this.lessons().findIndex((item) => item.id === this.requestedLesson),
          ),
        );
      });
    fetch('/test-lessons/index.json')
      .then(async (response) => {
        if (!response.ok) throw new Error('Lesson files could not be loaded.');
        const payload = await response.json();
        this.all.set(payload.lessons);
        this.choose(
          Math.max(
            0,
            this.lessons().findIndex((item) => item.id === this.requestedLesson),
          ),
        );
      })
      .catch(() => this.error.set('Could not load test lessons. Refresh the page to try again.'))
      .finally(() => this.loading.set(false));
  }
  choose(index: number) {
    this.clearRecording();
    this.selected.set(index);
    this.answer.set('');
    this.correct.set(false);
    this.answerFeedback.set('');
    this.writingFeedback.set('');
    this.audioError.set('');
    this.meaningVisible.set(false);
    const item = this.lesson();
    if (item) this.practiceStore.visit(item.id);
    this.draft.set(item ? (this.practices()[item.id]?.draft ?? '') : '');
  }
  changeSupport(value: string) {
    if (!['guided', 'supported', 'independent'].includes(value)) return;
    this.profileStore.setAssistance(value as Assistance);
    this.support.set(value);
    this.meaningVisible.set(false);
    this.transcriptVisible.set(value !== 'independent');
  }
  checkAnswer() {
    const item = this.lesson();
    if (!item) return;
    const clean = (value: string) =>
      value
        .normalize('NFC')
        .trim()
        .toLocaleLowerCase(item.language)
        .replace(/[.!?。]+$/u, '')
        .trim();
    const valid = clean(this.answer()) === clean(item.answer);
    this.correct.set(valid);
    this.answerFeedback.set(
      valid
        ? 'Correct. Now use the expression in your own writing.'
        : 'Try again. Re-read or listen to the example and look at the grammar note.',
    );
  }
  saveWriting() {
    if (!this.draft().trim()) {
      this.writingFeedback.set('Write a response first.');
      return;
    }
    this.persist(false);
    this.writingFeedback.set(
      'Draft saved for practice. Self-review: does it express your idea, use the lesson pattern, and make sense when read aloud? Automated grammar assessment is not included in this test.',
    );
  }
  complete() {
    if (!this.correct() || !this.draft().trim()) {
      this.writingFeedback.set('Complete the recall check and write your response first.');
      return;
    }
    this.persist(true);
    this.writingFeedback.set(
      'Practice marked complete. This records participation, not a proficiency assessment.',
    );
  }
  private persist(complete: boolean) {
    const item = this.lesson();
    if (!item) return;
    this.practiceStore.save(item.id, this.draft(), complete);
  }
  async record() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      this.recordingError.set(
        'Recording is unavailable in this browser. Try a current browser on localhost or HTTPS.',
      );
      return;
    }
    this.clearRecording();
    const token = this.generation;
    this.starting.set(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.destroyed || token !== this.generation) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      const recorder = new MediaRecorder(stream);
      this.recorder = recorder;
      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        this.recording.set(false);
        clearTimeout(this.timer);
        if (!this.destroyed && token === this.generation && chunks.length)
          this.recordingUrl.set(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType })));
      };
      recorder.onerror = () => {
        this.recordingError.set('Recording failed. Please try again.');
        this.stop();
      };
      recorder.start();
      this.recording.set(true);
      this.timer = setTimeout(() => this.stop(), 60000);
    } catch {
      this.stream?.getTracks().forEach((track) => track.stop());
      this.recordingError.set(
        'Microphone access was denied or unavailable. Writing practice still works.',
      );
    } finally {
      this.starting.set(false);
    }
  }
  stop() {
    if (this.recorder?.state === 'recording') this.recorder.stop();
  }
  private clearRecording() {
    this.generation++;
    clearTimeout(this.timer);
    this.stop();
    this.stream?.getTracks().forEach((track) => track.stop());
    this.recording.set(false);
    if (this.recordingUrl()) URL.revokeObjectURL(this.recordingUrl());
    this.recordingUrl.set('');
    this.recordingError.set('');
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.clearRecording();
  }
}
