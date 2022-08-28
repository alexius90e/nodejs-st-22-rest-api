import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  public async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsRepository.create({ ...createGroupDto });
  }

  public async findAll(): Promise<Group[]> {
    return this.groupsRepository.findAll();
  }

  public async findOne(id: string): Promise<Group> {
    return this.groupsRepository.findOne(id);
  }

  public async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupsRepository.update(id, updateGroupDto);
    return this.findOne(id);
  }

  public async remove(id: string): Promise<number> {
    return this.groupsRepository.destroy(id);
  }

  public async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    this.groupsRepository.addUsersToGroup(groupId, userIds);
  }
}
