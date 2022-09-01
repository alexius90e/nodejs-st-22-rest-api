import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectModel(Group) private groupsDataSource: typeof Group,
    @InjectModel(User) private usersDataSource: typeof User,
    private sequelize: Sequelize,
  ) {}

  public async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsDataSource.create<Group, CreateOptions<any>>({ ...createGroupDto });
  }

  public async findAll(): Promise<Group[]> {
    return this.groupsDataSource.findAll<Group>();
  }

  public async findOne(id: string): Promise<Group> {
    return this.groupsDataSource.findOne<Group>({ where: { id } });
  }

  public async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<[affectedCount: number]> {
    return this.groupsDataSource.update<Group>({ ...updateGroupDto }, { where: { id } });
  }

  public async destroy(id: string): Promise<number> {
    return this.groupsDataSource.destroy<Group>({ where: { id } });
  }

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    try {
      await this.sequelize.transaction<void>(async (transaction) => {
        const group = await this.groupsDataSource.findOne({
          where: { id: groupId },
          transaction,
        });
        const users = await Promise.all(
          userIds.map((id) => this.usersDataSource.findOne<User>({ where: { id } })),
        );

        await group.$add<User>('users', users, { transaction });
      });
    } catch (error: unknown) {
      throw error;
    }
  }
}
