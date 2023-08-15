import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('jsonb')
  options: string[]; 

  @Column()
  correctAnswer: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateOptions() {
    if (this.options.length !== 4) {
      throw new Error('The options array must contain exactly 4 elements.');
    }
  }
}
