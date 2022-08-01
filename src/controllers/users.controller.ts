import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDto } from 'src/data-access/user.dto';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/services/users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAutoSuggestUsers(@Query() query): Promise<User[]> {
    return this.usersService.getAllUsers(query.loginSubstring, query.limit);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.usersService.updateUser(id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<number> {
    return this.usersService.deleteUser(id);
  }
}
