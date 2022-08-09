import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getAutoSuggestUsers(@Query() query): Promise<User[]> {
    return this.usersService.getAllUsers(query.loginSubstring, query.limit);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  public async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Put(':id')
  public async updateUser(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
    return this.usersService.updateUser(id, userDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<number> {
    return this.usersService.deleteUser(id);
  }
}
