import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

async function prepareApp(): Promise<void | ServiceWorkerRegistration> {
  if (!environment.production) {
    const { MockServiceWorker } = await import('./mocks/browser');
    return MockServiceWorker.start();
  }
  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
});
