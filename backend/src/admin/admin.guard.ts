import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(
      context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionData = request.session.user;

    if (!sessionData) {
      return false;
    }

    const user = await this.userService.getUserById(sessionData.id);

    if (!user) {
      return false;
    }

    return user.role === 'ADMIN';
  }
}
