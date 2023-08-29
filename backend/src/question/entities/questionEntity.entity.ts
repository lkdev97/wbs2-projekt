import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
<<<<<<< HEAD
  id: string;
=======
  id: number;
>>>>>>> 77be42071220043b2b88e44f46803efbe448175e

  @Column()
  text: string;

  @Column('text')
  options: string[]; 

  @Column()
  correctAnswer: string;

}
