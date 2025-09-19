import { Component, inject, OnChanges, OnInit, resource, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserInterface } from '../../interfaces/user.interface';
import { ListUsers } from '../list-users/list-users';
import { UserStore } from '../../store/user.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  imports: [ListUsers, HttpClientModule],
})
export class Task implements OnInit, OnChanges {
  readonly taskService = inject(TaskService);
  readonly http = inject(HttpClient);
  readonly store = inject(UserStore);

  addUsers(newUsers: UserInterface[]): void {
    console.log('newUsers', newUsers);
    patchState(this.store, ({ users }) => ({ users: [...users, ...newUsers] }));
  }

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

  private async getUsers() {
    const users = await this.http.get<UserInterface[]>('https://api.github.com/users/');
    users.subscribe({
      next: (data) => {
        this.addUsers(data);
      },
      error: () => {
        this.addUsers([]);
      },
    });
  }
}
