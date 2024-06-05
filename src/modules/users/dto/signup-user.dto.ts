import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsOptional()
  profileImg?: string;
}
