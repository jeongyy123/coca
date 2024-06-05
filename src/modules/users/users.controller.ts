import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //일반 회원가입
  @Post('/signup')
  signup(@Body() data: SignupUserDto) {
    return this.usersService.signup(
      data.email,
      data.password,
      data.nickname,
      data.profileImg,
    );
  }

  // 일반 로그인
  @Post('/login')
  login(@Body() data: LoginUserDto) {
    return this.usersService.login(data.email, data.password);
  }

  // 일반 회원 정보 수정
  @Patch('/self/edit')
  updateUser(@Body() data: UpdateUserDto, @Req() req: Request) {
    const userId = req.user['userId'];
    console.log('req.user', req.user);
    return this.usersService.updateUser(data.password, data.nickname, userId);
  }

  // 일반 회원탈퇴 - req.user의 userId를 받아서 사용.
  // @Delete('/signout')
  // signout() {
  //   return this.usersService.signout()
  // }
}
