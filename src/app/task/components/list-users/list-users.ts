import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from '../../store/user.store';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-list-users',
  template: `
    <p>Loading: {{ store.isLoading() }}</p>
    <p>Users:</p>
    <ul>
      @for (user of store.sortedUsers(); track trackByUserLogin(user)) {
      <li>{{ user.login }}</li>
      }
    </ul>
    <p>Order: {{ store.filter.order() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsers {
  readonly store = inject(UserStore);

  constructor() {
    this.store.loadAll();
  }

  trackByUserLogin(user: UserInterface): string {
    return user.login;
  }
}
