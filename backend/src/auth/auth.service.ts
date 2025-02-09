import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/userEntity.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
