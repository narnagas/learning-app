import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-language-library',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <a class="brand" href="/">Learning App<span>A language. Your voice.</span></a
      ><span class="tag">Your learning journey</span>
    </header>
    <main>
      <section class="intro">
        <p class="eyebrow">MAKE ROOM FOR A NEW LANGUAGE</p>
        <h1>Your world.<br />A new way to express it.</h1>
        <p>
          Bring your interests, experiences, and ideas. Build the language to share them—at your own
          pace.
        </p>
      </section>
      <section aria-labelledby="language-heading">
        <div class="section-title">
          <h2 id="language-heading">Which language would you like to explore?</h2>
          <span>01 / Choose your language</span>
        </div>
        <div class="languages">
          @for (language of languages; track language.code) {
            <button
              class="language"
              [class.selected]="selected() === language.code"
              [attr.aria-pressed]="selected() === language.code"
              (click)="selected.set(language.code)"
            >
              <span class="native" [attr.lang]="language.code">{{ language.greeting }}</span
              ><span class="language-name">{{ language.name }}</span
              ><span class="description">{{ language.description }}</span
              ><span class="choose">{{
                selected() === language.code ? 'Selected ✓' : 'Explore language →'
              }}</span>
            </button>
          }
        </div>
        @if (selected()) {
          <p class="selection" role="status">
            You've chosen {{ selectedName() }}.
            <a [routerLink]="['/lessons', selected()]">Open 10 test lessons →</a>
          </p>
        }
      </section>
      <section class="approach" aria-labelledby="approach-heading">
        <div>
          <p class="eyebrow">LEARNING THAT RESPECTS YOUR EXPERIENCE</p>
          <h2 id="approach-heading">Understand first.<br />Find your words.</h2>
          <p>
            Start with listening and reading, explore useful grammar, then write about things that
            matter to you. Speak when you're ready.
          </p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>Hear & read</h3>
              <p>Meet the language in familiar, meaningful situations.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Build & write</h3>
              <p>Use grammar and adjustable hints to express your own ideas.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Speak & connect</h3>
              <p>Move toward conversation as your confidence grows.</p>
            </div>
          </li>
        </ol>
      </section>
    </main>
    <footer>
      Your pace. Your interests. Your voice.<span>French · Turkish · Russian · Italian</span>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }
    header,
    main,
    footer {
      max-width: 1120px;
      margin: auto;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 0;
      border-bottom: 1px solid #d9ddd6;
    }
    .brand {
      color: #183d34;
      text-decoration: none;
      font-size: 22px;
      font-weight: 750;
    }
    .brand span {
      display: block;
      font-size: 12px;
      font-weight: 400;
      margin-top: 4px;
    }
    .tag,
    .eyebrow {
      font-size: 11px;
      letter-spacing: 0.12em;
      font-weight: 650;
    }
    .tag {
      padding: 10px 14px;
      background: #e4ebe1;
      border-radius: 30px;
    }
    .intro {
      max-width: 750px;
      padding: 72px 0 52px;
    }
    h1 {
      font-family: Georgia, serif;
      font-size: clamp(42px, 6vw, 72px);
      line-height: 1.07;
      font-weight: 400;
      margin: 20px 0 24px;
      letter-spacing: -0.035em;
    }
    p {
      line-height: 1.7;
      color: #52635c;
    }
    .intro > p:last-child {
      max-width: 570px;
      font-size: 18px;
    }
    .eyebrow {
      color: #47745e;
    }
    .section-title {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 22px;
    }
    h2 {
      font-size: 23px;
      font-weight: 550;
      margin: 0;
    }
    .section-title > span {
      color: #66776e;
      font-size: 12px;
    }
    .languages {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }
    .language {
      text-align: left;
      padding: 30px;
      border: 1px solid #d1dbcf;
      border-radius: 16px;
      background: #fffef9;
      color: #173d32;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      min-height: 235px;
      transition:
        transform 0.15s,
        border-color 0.15s;
    }
    .language:hover {
      transform: translateY(-3px);
      border-color: #47745e;
    }
    .language.selected {
      border: 2px solid #31614d;
      background: #edf3e8;
      padding: 29px;
    }
    .language:focus-visible {
      outline: 3px solid #bb7c35;
      outline-offset: 4px;
    }
    .native {
      font-family: Georgia, serif;
      font-size: 35px;
      margin-bottom: 24px;
    }
    .language-name {
      font-size: 20px;
      font-weight: 650;
    }
    .description {
      font-size: 14px;
      color: #66776e;
      margin-top: 8px;
    }
    .choose {
      font-size: 13px;
      margin-top: 28px;
      font-weight: 650;
    }
    .selection {
      background: #e6eee0;
      padding: 14px 20px;
      border-radius: 8px;
    }
    .approach {
      margin: 64px 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 70px;
      background: #ecefe6;
      padding: 40px;
      border-radius: 18px;
    }
    .approach h2 {
      font-family: Georgia, serif;
      font-size: 34px;
      font-weight: 400;
    }
    .approach p {
      font-size: 14px;
    }
    .approach ol {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .approach li {
      display: flex;
      gap: 20px;
      padding: 16px 0;
      border-bottom: 1px solid #d5ddcf;
    }
    .approach li:last-child {
      border: 0;
    }
    .approach li > span {
      color: #668567;
      font-size: 12px;
      padding-top: 5px;
    }
    h3 {
      margin: 0;
      font-size: 17px;
      font-weight: 550;
    }
    .approach li p {
      margin: 6px 0 0;
    }
    footer {
      border-top: 1px solid #d9ddd6;
      padding: 24px 0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #66776e;
    }
    @media (max-width: 1180px) {
      header,
      main,
      footer {
        margin-left: 24px;
        margin-right: 24px;
      }
    }
    @media (max-width: 700px) {
      .tag {
        display: none;
      }
      .intro {
        padding: 42px 0 32px;
      }
      .section-title {
        align-items: flex-start;
        flex-direction: column;
      }
      .languages {
        grid-template-columns: 1fr;
      }
      .language {
        min-height: 0;
        padding: 24px;
      }
      .language.selected {
        padding: 23px;
      }
      .native {
        margin-bottom: 14px;
      }
      .approach {
        grid-template-columns: 1fr;
        gap: 18px;
        padding: 26px;
        margin: 40px 0;
      }
      footer {
        gap: 16px;
        flex-direction: column;
      }
    }
  `,
})
export class LanguageLibrary {
  readonly languages = [
    {
      code: 'it',
      name: 'Italian',
      greeting: 'Buongiorno',
      description: 'Share your ideas with a new rhythm and voice.',
    },
    {
      code: 'fr',
      name: 'French',
      greeting: 'Bonjour',
      description: 'Discover another way to share your world.',
    },
    {
      code: 'tr',
      name: 'Turkish',
      greeting: 'Merhaba',
      description: 'Build connections through everyday meaning.',
    },
    {
      code: 'ru',
      name: 'Russian',
      greeting: 'Здравствуйте',
      description: 'Find new words for familiar experiences.',
    },
  ];
  readonly selected = signal<string | null>(null);
  selectedName(): string {
    return this.languages.find((language) => language.code === this.selected())?.name ?? '';
  }
}
