import { OmitType } from '@nestjs/mapped-types';
import { SignupUserDto } from './signup-user.dto';

export class LoginUserDto extends OmitType(SignupUserDto, [
  'nickname',
] as const) {}
