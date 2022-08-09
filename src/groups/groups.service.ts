import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';
import { User } from 'src/users/models/user.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private groupsRepository: typeof Group,
    @InjectModel(User) private usersRepository: typeof User,
    private sequelize: Sequelize,
  ) {}

  public async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsRepository.create({ ...createGroupDto });
  }

  public async findAll(): Promise<Group[]> {
    return this.groupsRepository.findAll<Group>();
  }

  public async findOne(id: string): Promise<Group> {
    return this.groupsRepository.findOne<Group>({ where: { id } });
  }

  public async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupsRepository.update({ ...updateGroupDto }, { where: { id } });
    return this.findOne(id);
  }

  public async remove(id: string): Promise<number> {
    return this.groupsRepository.destroy({ where: { id } });
  }

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    try {
      await this.sequelize.transaction(async (transaction) => {
        const transactionHost = { transaction };
        const group = await this.groupsRepository.findOne({
          ...transactionHost,
          where: { id: groupId },
        });
        const users = await Promise.all(
          userIds.map((id) => this.usersRepository.findOne({ where: { id } })),
        );

        await group.$add('users', users, transactionHost);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
