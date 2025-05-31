import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {}
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
