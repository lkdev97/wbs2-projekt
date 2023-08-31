import { UserRole } from '../entities/userEntity.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user to update',
    example: 'Cedric Stefan',
  })
  username?: string;
  @ApiProperty({
    description: 'The password of the user to update',
    example: '12fgghzghtzztgh',
  })
  password?: string;
  @ApiProperty({
    description: 'The role of the user to update',
    example: 'ADMIN',
  })
  role?: UserRole;
  @ApiProperty({
    description: 'The online status of the user to update',
    example: 'true if online, false if offline',
  })
  online?: boolean;
}
