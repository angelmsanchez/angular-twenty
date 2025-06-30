import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
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
export class Task implements OnInit {
  title = signal('task-twenty');
  users = signal<UserInterface[]>([]);
  titleUpper = computed(() => this.title().toUpperCase());
  titleLinked = linkedSignal(() => this.title());
  counter = signal(0);
  protected subTitle = 'subTitle string';
  private taskService = inject(TaskService);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getUsers();
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
