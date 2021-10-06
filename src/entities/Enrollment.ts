import {
    Entity,
    Generated,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne, JoinColumn
  } from 'typeorm';

  import { User } from './User'
  
  @Entity()
  export class Enrollment {
    @PrimaryColumn()
    @Generated('uuid')
    id!: string;
  
    @Column({
      type: 'varchar'
    })
    course_name!: string;
  
    @Column({
      type: 'varchar'
    })
    author!: string;
  
    @Column()
    category!: string;
  
    @Column()
    description!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;
  }
  