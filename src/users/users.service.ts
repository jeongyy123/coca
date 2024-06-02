import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // 일반 회원가입
  async signup(email: string, password: string, nickname: string) {
    const checkUser = this.usersRepository.findOne({
      where: { email, deletedAt: null },
      select: ['email'],
    });

    if (checkUser)
      throw new ConflictException(`이미 가입된 이메일 주소입니다.`);

    const newUser = this.usersRepository.create({ email, password, nickname });

    this.usersRepository.save(newUser);

    return { message: `${nickname}님 가입을 축하드립니다.` };
  }

  // 일반 로그인
  async login(email: string, password: string) {
    const user = await this.checkUserForLogin(email, password);

    return { message: `${user.nickname}님 어서오세요.` };
  }

  // 일반 회원 정보 수정
  async updateUser(password: string, nickname: string, req: any) {
    const userId = req.user.userId;
    const user = await this.usersRepository.findOne({
      where: { userId, deletedAt: null },
    });

    if (!user) throw new NotFoundException(`해당 사용자가 존재하지않습니다.`);

    user.password = password;
    user.nickname = nickname;

    await this.usersRepository.save(user);

    return { message: `회원정보가 수정되었습니다.` };
  }

  // 일반 회원 정보 수정
  // signout() {}

  private async checkUserForLogin(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email, deletedAt: null },
    });

    if (!user) throw new NotFoundException(`해당 사용자가 존재하지않습니다.`);

    if (user.password !== password)
      throw new UnauthorizedException(`비밀번호가 일치하지 않습니다.`);

    return user;
  }
}
