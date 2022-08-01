import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
