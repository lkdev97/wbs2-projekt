import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';

@Entity()
export class StatisticsEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  wins: number;

  @Column()
  totalGames: number;

  @ManyToOne(() => UserEntity, (user) => user.statistics)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
