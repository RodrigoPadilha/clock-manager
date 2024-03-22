import { IUser } from "../user/IUser";
import { IClockInterval } from "./IClockInterval";

export type ClockTypes = 'IN' | 'OUT';

export interface IClock {
  user: IUser;
  in: Date;
  out: Date;
  intervals: Array<IClockInterval>;
}