import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/components/home').then((m) => m.Home),
  },
  {
    path: 'task',
    loadComponent: () => import('./task/components/task').then((m) => m.Task),
  },
];
