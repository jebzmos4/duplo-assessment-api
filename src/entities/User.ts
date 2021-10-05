import {
  Entity,
  Generated,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  USER = 'user'
}

export enum SignupType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  EMAIL = 'email'
}

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  firstName!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  middleName!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  lastName!: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false
  })
  email!: string;

  @Column()
  password!: string;

  @Column()
  dob!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: SignupType,
    default: SignupType.EMAIL
  })
  loggedWith!: SignupType;

  @Column({
    type: 'varchar',
    length: 15,
    unique: true,
    nullable: true
  })
  phoneNumber!: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true
  })
  username!: string;

  @Column({
    nullable: false,
    default: true
  })
  isActive!: boolean;

  @Column()
  lastSeen!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
