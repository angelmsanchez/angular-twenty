import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { UserInterface } from '../interfaces/user.interface';
import { computed, inject } from '@angular/core';
import { UserService } from '../services';

type UserState = {
  users: UserInterface[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: UserState = {
  users: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const UserStore = signalStore(
  { protectedState: false, providedIn: 'root' },
  withState(initialState),
  withComputed(({ users, filter }) => ({
    usersCount: computed(() => users().length),
    sortedUsers: () => {
      const direction = filter.order() === 'asc' ? 1 : -1;
      return users().sort((a, b) => direction * a.login.localeCompare(b.login));
    },
  })),
  withMethods((store, userService = inject(UserService)) => ({
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      const users = await userService.getAll();
      users.subscribe({
        next: (data) => {
          setTimeout(() => {
            patchState(store, { users: data, isLoading: false });
          }, 2000);
        },
      });
    },
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
  }))
);
