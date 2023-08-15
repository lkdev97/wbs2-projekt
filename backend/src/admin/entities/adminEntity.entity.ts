import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity'

@Entity()
export class AdminEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, user => user.admin)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}

