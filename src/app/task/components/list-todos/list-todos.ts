import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Todo } from '../../interfaces/todo.interface';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-list-todos',
  template: `
    <div>
      <button type="submit" (click)="onAddTodo()">Add Todo</button>

      <ul>
        @for (todo of query.data(); track todo.title) {
          <li>{{ todo.title }}</li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTodos {
  readonly todoService = inject(TodoService);
  readonly queryClient = inject(QueryClient);

  query = injectQuery(() => ({
    queryKey: ['getTodos'],
    queryFn: (): ReturnType<TodoService['getTodos']> =>
      this.todoService.getTodos(),
  }));

  mutation = injectMutation(() => ({
    mutationFn: (todo: Todo): ReturnType<TodoService['addTodo']> =>
      this.todoService.addTodo(todo),
    onSuccess: (): void => {
      this.queryClient.invalidateQueries({ queryKey: ['getTodos'] });
    },
  }));

  onAddTodo(): void {
    this.mutation.mutate({
      id: Date.now().toString(),
      title: 'Do Laundry',
    });
    console.log('onAddTodo');
  }
}
