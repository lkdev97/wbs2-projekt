import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('text')
  options: string[]; 

  @Column()
  correctAnswer: string;

}
