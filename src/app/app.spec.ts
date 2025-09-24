// import { describe, beforeEach, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { App } from './app';

describe('App', () => {
  let spectator: Spectator<App>;
  const createComponent = createComponentFactory({
    component: App,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.query('nav')).toHaveClass('nav');
    expect(spectator.query('main')).toHaveClass('main');
  });

  // xit('should render title', () => {
  //   const fixture = TestBed.createComponent(App);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-twenty');
  // });
});
