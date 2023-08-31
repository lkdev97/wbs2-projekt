import { UserRole } from '../entities/userEntity.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Cedric Lars',
  })
  username: string;
  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'USER',
  })
  role: UserRole;
}
