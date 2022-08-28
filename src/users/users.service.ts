import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  public async createUser(userDto: UserDto): Promise<User> {
    return this.usersRepository.create(userDto);
  }

  public async getAllUsers(substring = '', limit = 10): Promise<User[]> {
    return this.usersRepository.findAll().then((users): User[] =>
      users
        .filter((user: User): boolean => user.login.includes(substring))
        .sort((a: User, b: User): number => (a.login > b.login ? 1 : -1))
        .slice(0, limit),
    );
  }

  public async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOneById(id);
  }

  public async getUserByLogin(login: string): Promise<User> {
    return this.usersRepository.findOneByLogin(login);
  }

  public async updateUser(id: string, userDto: UserDto): Promise<User> {
    await this.usersRepository.update(id, userDto);
    return this.getUserById(id);
  }

  public async deleteUser(id: string): Promise<number> {
    return this.usersRepository.destroy(id);
  }
}
