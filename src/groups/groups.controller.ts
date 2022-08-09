import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  public async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  public async findAllGroups(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @Get(':id')
  public async findOneGroup(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Put(':id')
  public async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  public async removeGroup(@Param('id') id: string): Promise<number> {
    return this.groupsService.remove(id);
  }
}
