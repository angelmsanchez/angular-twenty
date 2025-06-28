import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  { path: 'task', renderMode: RenderMode.Client },
  // { path: 'products', renderMode: RenderMode.Server },
];
