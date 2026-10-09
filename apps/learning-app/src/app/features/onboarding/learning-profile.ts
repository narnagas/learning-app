import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileStore, emptyProfile } from '../../core/learning/learning-profile';

const questions: Record<string, string[]> = {
  en: [
    'Tell me about a part of your day you enjoy. What makes it meaningful?',
    'Describe an idea or experience you like discussing. How would you explain it to someone new?',
    'What makes a conversation enjoyable for you? Consider humor, empathy, directness, or reflection.',
  ],
  es: [
    'Cuéntame sobre una parte de tu día que disfrutas. ¿Por qué es importante para ti?',
    'Describe una idea o experiencia de la que te gusta hablar. ¿Cómo se la explicarías a alguien nuevo?',
    '¿Qué hace que disfrutes una conversación? Piensa en el humor, la empatía, la franqueza o la reflexión.',
  ],
  fr: [
    'Parlez-moi d’un moment de votre journée que vous appréciez. Qu’est-ce qui le rend important pour vous ?',
    'Décrivez une idée ou une expérience dont vous aimez parler. Comment l’expliqueriez-vous à une nouvelle personne ?',
    'Qu’est-ce qui rend une conversation agréable pour vous ? Pensez à l’humour, à l’empathie, à la franchise ou à la réflexion.',
  ],
  tr: [
    'Gününüzün sevdiğiniz bir bölümünü anlatın. Bu bölümü sizin için anlamlı kılan nedir?',
    'Konuşmayı sevdiğiniz bir fikri veya deneyimi anlatın. Bunu yeni tanıştığınız birine nasıl açıklardınız?',
    'Bir sohbeti sizin için keyifli kılan nedir? Mizah, empati, açık sözlülük veya düşünmeye zaman ayırmayı göz önünde bulundurun.',
  ],
  ru: [
    'Расскажите о приятной части вашего дня. Почему она важна для вас?',
    'Опишите идею или опыт, которые вам нравится обсуждать. Как бы вы объяснили это новому знакомому?',
    'Что делает разговор приятным для вас? Подумайте о юморе, сочувствии, прямоте или размышлении.',
  ],
  it: [
    'Racconta un momento della giornata che ti piace. Che cosa lo rende significativo?',
    'Descrivi un’idea o un’esperienza di cui ti piace parlare. Come la spiegheresti a una persona appena conosciuta?',
    'Che cosa rende piacevole una conversazione per te? Pensa all’umorismo, all’empatia, alla schiettezza o alla riflessione.',
  ],
};

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './learning-profile.html',
  styleUrl: './learning-profile.css',
})
export class LearningProfilePage {
  readonly store = inject(ProfileStore);
  model = structuredClone(this.store.profile() ?? emptyProfile());
  readonly native = signal(this.model.nativeLanguage);
  readonly prompts = computed(() => questions[this.native()] ?? questions['en']);
  readonly message = signal('');
  readonly languages = [
    { code: 'fr', name: 'French' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ru', name: 'Russian' },
    { code: 'it', name: 'Italian' },
  ];
  save() {
    const saved = this.store.save(this.model);
    this.message.set(
      saved
        ? 'Your profile is saved. Review it below, or start practicing.'
        : 'Your preferences are active for this session. See the storage message below.',
    );
  }
  clear() {
    this.store.clear();
    this.model = emptyProfile();
    this.native.set('en');
    this.message.set(
      'Your profile has been cleared. Existing lesson drafts and progress are kept separately.',
    );
  }
}
