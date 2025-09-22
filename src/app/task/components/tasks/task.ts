import { Component, inject, OnChanges, OnInit, resource, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { ListUsers } from '../list-users/list-users';
import { UserStore } from '../../store/user.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  imports: [ListUsers],
})
export class Task implements OnChanges {
  readonly taskService = inject(TaskService);
  readonly http = inject(HttpClient);
  readonly store = inject(UserStore);

  addUser(): void {
    const newUser = {
      login: 'aaaa nuevo',
      id: 6,
      node_id: 'MDQ6VXNlcjY=',
      avatar_url: 'https://avatars.githubusercontent.com/u/6?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/ivey',
      html_url: 'https://github.com/ivey',
      followers_url: 'https://api.github.com/users/ivey/followers',
      following_url: 'https://api.github.com/users/ivey/following{/other_user}',
      gists_url: 'https://api.github.com/users/ivey/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/ivey/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/ivey/subscriptions',
      organizations_url: 'https://api.github.com/users/ivey/orgs',
      repos_url: 'https://api.github.com/users/ivey/repos',
      events_url: 'https://api.github.com/users/ivey/events{/privacy}',
      received_events_url: 'https://api.github.com/users/ivey/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    };
    patchState(this.store, (state) => ({ users: [...state.users, newUser] }));
  }

  userResource = resource({
    loader: () => {
      return fetch(`https://api.github.com/users/2`);
    },
  });

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    console.log('user', this.userResource.value());
  }
}
