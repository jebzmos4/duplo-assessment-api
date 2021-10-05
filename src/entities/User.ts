import {
  Entity,
  Generated,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  first_name!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  last_name!: string;

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

  @Column()
  gender!: string;

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

  @Column({
    type: 'date',
    default: new Date()
  })
  lastSeen!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
