import { Controller, Post, Request } from '@nestjs/common';
import { User } from 'src/users/models/user.model';

@Controller('v1/auth')
export class AuthController {
  @Post('login')
  async login(@Request() req): Promise<User> {
    return req.user;
  }
}
