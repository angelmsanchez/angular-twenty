import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UserStore } from '../../store/user.store';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-list-users',
  imports: [JsonPipe],
  template: `
    <!-- <p>Books: {{ store.users() | json }}</p> -->
    <p>Books:</p>
    <ul>
      @for (user of store.users(); track trackByUserLogin(user)) {
      <li>{{ user.login }}</li>
      }
    </ul>
    <p>Loading: {{ store.isLoading() }}</p>
    <p>Pagination: {{ store.filter() | json }}</p>
    <p>Query: {{ store.filter.query() }}</p>
    <p>Order: {{ store.filter.order() }}</p>
  `,
  providers: [UserStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsers {
  readonly store = inject(UserStore);

  trackByUserLogin(user: UserInterface): string {
    return user.login;
  }
}
