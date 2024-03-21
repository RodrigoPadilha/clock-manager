import { IClock } from "@/domain/clock/IClock";
import { IClockInterval } from "@/domain/clock/IClockInterval";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('clocks')
export class Clock implements IClock {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, user => user._id)
  user: User;

  @Column({type: 'timestamp'})
  in: Date;

  @Column({type: 'timestamp', nullable: true})
  out: Date;

  @Column({type: 'json', nullable: true, default: null})
  intervals: IClockInterval[];
}