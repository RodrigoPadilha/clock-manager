import { User } from "@/infra/modules/users/entities/user.entity";
import { Request } from "express";

export interface CustomRequest extends Request {
  user: User;
}