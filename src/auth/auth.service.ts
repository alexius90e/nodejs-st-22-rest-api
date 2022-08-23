import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AccessToken } from './interfaces/access-token.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  public async validateUser(login: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByLogin(login);
    return user && user.password === password ? user : null;
  }

  public async login(user: User): Promise<AccessToken> {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
