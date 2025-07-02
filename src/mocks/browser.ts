import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { users } from './data/users';

export const userHandler = [
    http.get('https://api.github.com/users/', (response) => {
    const { user } = response.params;
    return HttpResponse.json(users);
  }),
  http.get('https://api.github.com/users/:id', (response) => {
    const { user } = response.params;
    return HttpResponse.json(users[0]);
  }),
];
const handlers = [...userHandler];
export const MockServiceWorker = setupWorker(...handlers);
