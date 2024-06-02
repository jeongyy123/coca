import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //일반 회원가입
  @Post('/signup')
  signup(@Body() data) {
    return this.usersService.signup(data.email, data.password, data.nickname);
  }

  // 일반 로그인
  @Post('/login')
  login(@Body() data) {
    return this.usersService.login(data.email, data.password);
  }

  // 일반 회원 정보 수정
  @Patch('/self/profile/edit')
  updateUser(@Body() data, @Req() req: Request) {
    return this.usersService.updateUser(data.password, data.nickname, req);
  }

  // 일반 회원탈퇴 - req.user의 userId를 받아서 사용.
  // @Delete('/signout')
  // signout() {
  //   return this.usersService.signout()
  // }
}
