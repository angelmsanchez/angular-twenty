import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnChanges,
  OnInit,
  resource,
  signal,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Title } from '../../shared/components/title/title';
import { TaskService } from '../services/task.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  imports: [Button, Title, HttpClientModule],
})
export class Task implements OnInit , OnChanges{
  title = signal('task-twenty');
  users = signal<UserInterface[]>([]);
  titleUpper = computed(() => this.title().toUpperCase());
  titleLinked = linkedSignal(() => this.title());
  counter = signal(0);
  protected subTitle = 'subTitle string';

  private taskService = inject(TaskService);
  private http = inject(HttpClient);

  userResource = resource({
    loader: () => {
      return fetch(`https://api.github.com/users/2`);
    },
  });

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    console.log('user', this.userResource.value());
  }

  handleClickButton(): void {
    console.log('Button clicked: ' + this.counter() + ' times');
    this.counter.update((value) => value + 1);
    this.title.update((value) => value + this.counter());
  }

  clearTitle(): void {
    this.title.set(this.taskService.clearTitle());
    this.titleLinked.set('clear title');
  }

  trackByUserLogin(user: UserInterface): string {
    return user.login;
  }

  private async getUsers() {
    const users = await this.http.get<UserInterface[]>(
      'https://api.github.com/users/'
    );
    users.subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: () => {
        this.users.set([]);
      },
    });
  }
}
