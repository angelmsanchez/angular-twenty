import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { users } from './data/users';

export const userHandler = [
    http.get('https://api.github.com/users/', (response) => {
    const { user } = response.params;
    return HttpResponse.json(users);
  }),
  http.get('https://api.github.com/users/:user', (response) => {
    console.log('Mocking GET request for user:', response);
    const { user } = response.params;
    return HttpResponse.json({
      name: `mocked-${user}`,
      bio: 'mocked-bio',
    });
  }),
];
const handlers = [...userHandler];
export const MockServiceWorker = setupWorker(...handlers);
