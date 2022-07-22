import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './models/user-dto.interface';
import { User } from './models/user.interface';

@Injectable()
export class AppService {
  private users: User[] = [];

  public createUser(userDto: UserDto): User {
    const newUser: User = { id: uuidv4(), ...userDto };
    this.users.push(newUser);
    return newUser;
  }

  public getAllUsers(loginSubstring = '', limit = 10): User[] {
    return this.users
      .filter(
        (user: User): boolean =>
          user.login.includes(loginSubstring) && !user.isDeleted,
      )
      .sort((a: User, b: User) => (a.login > b.login ? 1 : -1))
      .slice(0, limit);
  }

  public getUserById(id: string): User {
    return this.users.find((user: User): boolean => user.id === id);
  }

  public updateUser(id: string, userDto: UserDto): User {
    this.users = this.users.map(
      (user: User): User => (user.id === id ? { id, ...userDto } : user),
    );
    return this.getUserById(id);
  }

  public deleteUser(id: string): User {
    this.users = this.users.map(
      (user: User): User =>
        user.id === id ? { ...user, isDeleted: true } : user,
    );
    return this.getUserById(id);
  }
}
