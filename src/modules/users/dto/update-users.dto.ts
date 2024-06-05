import { OmitType } from '@nestjs/mapped-types';
import { SignupUserDto } from './signup-user.dto';

export class UpdateUserDto extends OmitType(SignupUserDto, [
  'email',
] as const) {}
