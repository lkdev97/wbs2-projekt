import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(
      context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;

    if (!userId) {
      return false;
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      return false;
    }

    return user.role === 'ADMIN';
  }
}
