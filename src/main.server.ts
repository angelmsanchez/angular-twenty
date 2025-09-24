import {
  bootstrapApplication,
  BootstrapContext,
} from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';

const bootstrap = (context: BootstrapContext): Promise<ApplicationRef> => {
  return bootstrapApplication(App, config, context);
};

export default bootstrap;
