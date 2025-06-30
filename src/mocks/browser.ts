import { http } from 'msw';
import { setupWorker } from 'msw/browser';

// HttpResponseResolver<PathParams, DefaultBodyType, undefined>
console.log('INIT BROWSER MSW:');
export const mocks = [
  http.get('https://api.github.com/users/:user', (response) => {
    console.log('Mocking GET request for user:', response);
    const { user } = response.params;

    // return response.res(
    //   ctx.status(200),
    //   ctx.json({
    //     name: `mocked-${user}`,
    //     bio: 'mocked-bio',
    //   })
    // );
  }),
];

const worker = setupWorker(...mocks);
worker.start();

export { worker, http };
