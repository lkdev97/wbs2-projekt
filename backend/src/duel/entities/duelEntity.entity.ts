import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum DuelStatus {
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}

@Entity()
export class DuelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  challengerId: string;

  @Column()
  opponentId: string;

  @Column({
    type: 'text',
    enum: DuelStatus,
    default: DuelStatus.ONGOING,
  })
  status: DuelStatus;

  @Column({ nullable: true })
  winnerId: string;
}
