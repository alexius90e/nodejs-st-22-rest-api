import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions } from 'sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private usersDataSource: typeof User) {}

  public async create(userDto: UserDto): Promise<User> {
    return this.usersDataSource.create<User, CreateOptions<any>>({ ...userDto });
  }

  public async findAll(): Promise<User[]> {
    return this.usersDataSource.findAll<User>();
  }

  public async findOneById(id: string): Promise<User> {
    return this.usersDataSource.findOne<User>({ where: { id } });
  }

  public async findOneByLogin(login: string): Promise<User> {
    return this.usersDataSource.findOne<User>({ where: { login } });
  }

  public async update(
    id: string,
    userDto: UserDto,
  ): Promise<[affectedCount: number, affectedRows: User[]]> {
    return this.usersDataSource.update<User>(
      { id, ...userDto },
      { where: { id }, returning: true },
    );
  }

  public async destroy(id: string): Promise<number> {
    return this.usersDataSource.destroy<User>({ where: { id } });
  }
}
