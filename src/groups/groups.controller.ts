import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(createGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findAllGroups(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async findOneGroup(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupsService.update(id, updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async removeGroup(@Param('id') id: string): Promise<number> {
    return this.groupsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  public async addUsersToGroup(
    @Param('id') groupId: string,
    @Body() userIds: string[],
  ): Promise<void> {
    try {
      await this.groupsService.addUsersToGroup(groupId, userIds);
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
}
