import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupsRepository: typeof Group) {}

  public async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsRepository.create({ id: uuidv4(), ...createGroupDto });
  }

  public async findAll(): Promise<Group[]> {
    return this.groupsRepository.findAll<Group>();
  }

  public async findOne(id: string): Promise<Group> {
    return this.groupsRepository.findOne<Group>({ where: { id } });
  }

  public async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupsRepository.update({ ...updateGroupDto }, { where: { id }, returning: true });
    return this.findOne(id)
  }

  public async remove(id: string): Promise<number> {
    return this.groupsRepository.destroy({ where: { id } });
  }
}
