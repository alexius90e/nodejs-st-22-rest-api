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
import { AppService } from 'src/app.service';
import { UserDto } from 'src/models/user-dto.interface';
import { User } from 'src/models/user.interface';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAutoSuggestUsers(@Query() query): User[] {
    return this.appService.getAllUsers(query.loginSubstring, query.limit);
  }

  @Get(':id')
  getUserById(@Param("'id'") id: string): User {
    return this.appService.getUserById(id);
  }

  @Post()
  createUser(@Body() userDto: UserDto): User {
    return this.appService.createUser(userDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto): User {
    return this.appService.updateUser(id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): User {
    return this.appService.deleteUser(id);
  }
}
