import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';

@Entity()
export class AdminEntity {
  @ApiProperty({ description: 'User ID', example: '1234567890' })
  @PrimaryColumn('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.admin)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
