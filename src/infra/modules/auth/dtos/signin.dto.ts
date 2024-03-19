import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class SigninDto {

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}