import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByLogin(login);
    return user && user.password === password ? user : null;
  }
}
