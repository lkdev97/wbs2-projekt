import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username for login',
    example: 'CedricLars',
  })
  username: string;

  @ApiProperty({
    description: 'The password for login',
    example: '123456',
  })
  password: string;
}
