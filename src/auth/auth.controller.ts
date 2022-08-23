import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('v1/auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<User> {
    return req.user;
  }
}
