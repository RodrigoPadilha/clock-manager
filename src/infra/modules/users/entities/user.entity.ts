import { IUser } from "@/domain/user/IUser";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  _id: number;
  @Column({ type: 'varchar', length: 255})
  email: string;
  @Column({ type: 'varchar', length: 255})
  password: string;
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}