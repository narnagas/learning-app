import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'languages' },
  {
    path: 'languages',
    loadComponent: () =>
      import('./features/language-library/language-library').then(
        (module) => module.LanguageLibrary,
      ),
  },
  { path: '**', redirectTo: 'languages' },
];
