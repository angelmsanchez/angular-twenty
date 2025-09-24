import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly http = inject(HttpClient);

  async getAll() {
    const users = await this.http.get<UserInterface[]>(
      'https://api.github.com/users/',
    );
    return users;
  }
}
