import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  public async createUser(userDto: UserDto): Promise<User> {
    return this.usersRepository.create({ id: uuidv4(), ...userDto });
  }

  public async getAllUsers(substring = '', limit = 10): Promise<User[]> {
    return this.usersRepository.findAll<User>().then((users): User[] =>
      users
        .filter((user: User): boolean => user.login.includes(substring))
        .sort((a: User, b: User): number => (a.login > b.login ? 1 : -1))
        .slice(0, limit),
    );
  }

  public async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  public async updateUser(id: string, userDto: UserDto): Promise<User[]> {
    return this.usersRepository
      .update({ id, ...userDto }, { where: { id }, returning: true })
      .then((res) => res[1]);
  }

  public async deleteUser(id: string): Promise<number> {
    return this.usersRepository.destroy({ where: { id } });
  }
}
