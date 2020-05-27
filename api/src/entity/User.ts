import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export default class User {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    nullable: true
  })
  address: string;

  @CreateDateColumn({ name: 'created_at' })'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}
