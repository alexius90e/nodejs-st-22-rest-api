import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/models/user.dto';
import { User } from 'src/models/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(userDto: UserDto): User {
    if (!this.checkLoginIsFree(userDto.login)) {
      throw new HttpException('Login Is Not Free', HttpStatus.BAD_REQUEST);
    }
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
      .sort((a: User, b: User): number => (a.login > b.login ? 1 : -1))
      .slice(0, limit);
  }

  public getUserById(id: string): User {
    const targetUser = this.users.find((user: User): boolean =>
      UsersService.checkUser(user, id),
    );
    if (!targetUser) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    return targetUser;
  }

  public updateUser(id: string, userDto: UserDto): User {
    const updatedUser: User = { id, ...userDto };
    if (!this.checkLoginIsFree(updatedUser.login, updatedUser.id)) {
      throw new HttpException('Login Is Not Free', HttpStatus.BAD_REQUEST);
    }
    this.users = [...this.users.filter((user) => user.id !== id), updatedUser];
    return updatedUser;
  }

  public deleteUser(id: string): User {
    this.users = [
      ...this.users.filter((user) => user.id !== id),
      { ...this.getUserById(id), isDeleted: true },
    ];
    throw new HttpException('User Was Deleted', HttpStatus.NO_CONTENT);
  }

  static checkUser(user: User, id: string): boolean {
    return user.id === id && !user.isDeleted;
  }

  private checkLoginIsFree(login: string, id?: string): boolean {
    return !this.users.find(
      (user) => user.login === login && (id ? user.id !== id : true),
    );
  }
}
