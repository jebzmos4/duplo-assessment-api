import {
  Entity,
  Generated,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

export enum UserEvents {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
  FORGOT_PASSWORD = 'forgot password',
  RESET_PASSWORD = 'reset password',
  CHANGE_PASSWORD = 'change password'
}

@Entity()
export class Log {
  @PrimaryColumn()
  @Generated('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  email!: string;

  @Column({
    type: 'enum',
    enum: UserEvents
  })
  events!: UserEvents;

  @Column({
    type: 'text'
  })
  request!: string;

  @Column({
    type: 'text'
  })
  response!: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  ip!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
