import { signalStore, withState } from '@ngrx/signals';
import { UserInterface } from '../interfaces/user.interface';

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
  withState(initialState)
);
