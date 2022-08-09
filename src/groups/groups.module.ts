import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './models/group.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Group, User])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
