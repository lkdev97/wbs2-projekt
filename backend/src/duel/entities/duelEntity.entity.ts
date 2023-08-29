import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/entities/userEntity.entity';

export enum DuelStatus {
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}

@Entity()
export class DuelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  challenger: UserEntity;

  @ManyToOne(() => UserEntity)
  opponent: UserEntity;

  @Column({
    type: 'text',
    enum: DuelStatus,
    default: DuelStatus.ONGOING,
  })
  status: DuelStatus;

  @Column({ nullable: true })
  winnerId: string;
}
