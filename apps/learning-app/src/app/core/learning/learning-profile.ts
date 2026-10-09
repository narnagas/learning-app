import { Injectable, signal } from '@angular/core';

export type Assistance = 'guided' | 'supported' | 'independent';
export type Depth = 'everyday' | 'exploratory' | 'in-depth';
export interface LearningProfile {
  nativeLanguage: string;
  targetLanguage: string;
  interests: string;
  environment: string;
  goal: string;
  depth: Depth;
  assistance: Assistance;
  conversation: string[];
  communication: string;
}
export const emptyProfile = (): LearningProfile => ({
  nativeLanguage: 'en',
  targetLanguage: 'fr',
  interests: '',
  environment: 'everyday',
  goal: '',
  depth: 'exploratory',
  assistance: 'guided',
  conversation: ['', '', ''],
  communication: '',
});
const KEY = 'learning-app-profile-v1';

@Injectable({ providedIn: 'root' })
export class ProfileStore {
  readonly profile = signal<LearningProfile | null>(null);
  readonly storageError = signal('');
  constructor() {
    try {
      const text = localStorage.getItem(KEY);
      if (text) {
        const data = JSON.parse(text);
        if (this.valid(data)) this.profile.set(data);
        else
          this.storageError.set('The saved profile could not be read. You can create a new one.');
      }
    } catch {
      this.storageError.set(
        'Browser storage is unavailable. Your profile can be used for this session.',
      );
    }
  }
  private valid(data: unknown): data is LearningProfile {
    if (!data || typeof data !== 'object') return false;
    const profile = data as LearningProfile;
    return (
      ['en', 'es', 'fr', 'tr', 'ru', 'it', 'other'].includes(profile.nativeLanguage) &&
      ['fr', 'tr', 'ru', 'it'].includes(profile.targetLanguage) &&
      ['everyday', 'work', 'home', 'travel', 'social'].includes(profile.environment) &&
      ['everyday', 'exploratory', 'in-depth'].includes(profile.depth) &&
      ['guided', 'supported', 'independent'].includes(profile.assistance) &&
      [profile.interests, profile.goal, profile.communication].every(
        (value) => typeof value === 'string',
      ) &&
      Array.isArray(profile.conversation) &&
      profile.conversation.length === 3 &&
      profile.conversation.every((value) => typeof value === 'string')
    );
  }
  save(profile: LearningProfile): boolean {
    if (!this.valid(profile)) return false;
    this.profile.set(structuredClone(profile));
    this.storageError.set('');
    try {
      localStorage.setItem(KEY, JSON.stringify(profile));
      return true;
    } catch {
      this.storageError.set(
        'Your profile is active for this session, but could not be saved in this browser.',
      );
      return false;
    }
  }
  setAssistance(assistance: Assistance) {
    const profile = this.profile();
    if (profile) this.save({ ...profile, assistance });
  }
  clear() {
    this.profile.set(null);
    this.storageError.set('');
    try {
      localStorage.removeItem(KEY);
    } catch {
      this.storageError.set(
        'Could not clear browser storage. Your session profile has been cleared.',
      );
    }
  }
}
