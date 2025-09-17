import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/components/home').then((m) => m.Home),
  },
  {
    path: 'task',
    loadComponent: () => import('./task/components/tasks/task').then((m) => m.Task),
  },
];
