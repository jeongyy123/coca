import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // 일반 회원가입
  async signup(
    email: string,
    password: string,
    nickname: string,
    profileImg: string,
  ) {
    const checkEmail = await this.usersRepository.findOne({
      where: { email, deletedAt: null },
      select: ['email'],
    });

    if (checkEmail) {
      throw new ConflictException(`${email}은 이미 가입된 이메일 주소입니다.`);
    }

    const checkNickname = await this.usersRepository.findOne({
      where: { nickname, deletedAt: null },
      select: ['nickname'],
    });

    if (checkNickname) {
      console.log(checkNickname);
      throw new ConflictException(`${nickname}은 이미 가입된 닉네임입니다.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultImg = this.configService.get<string>('DEFAULT_PROFILE_IMG');

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      nickname,
      profileImg: profileImg ? profileImg : defaultImg,
    });

    await this.usersRepository.save(newUser);
    console.log(newUser);
    return { message: `${nickname}님 가입을 축하드립니다.` };
  }

  // 일반 로그인
  async login(email: string, password: string) {
    const user = await this.existUser(email, password);

    const payload = { email: user.email, userId: user.userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
      expiresIn: '7d',
    });

    return {
      message: `${user.nickname}님 어서오세요.`,
      accessToken,
      refreshToken,
    };
  }

  // 일반 회원 정보 수정
  async updateUser(password: string, nickname: string, userId: number) {
    const user = await this.usersRepository.findOne({
      where: { userId, deletedAt: null },
    });

    if (!user) throw new NotFoundException(`해당 사용자가 존재하지않습니다.`);

    user.password = await bcrypt.hash(password, 10);
    user.nickname = nickname;

    await this.usersRepository.save(user);

    return { message: `회원정보가 수정되었습니다.` };
  }

  // 일반 로그아웃
  // signout() {}

  private async existUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email, deletedAt: null },
    });

    if (!user) throw new NotFoundException(`해당 사용자가 존재하지않습니다.`);

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException(`비밀번호가 일치하지 않습니다.`);
    }

    return user;
  }
}

// https://cdragon.tistory.com/entry/NestJS-Passport-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-feat-authentication#1-3.%20Implementing%20Passport%20local-1

// https://blog.naver.com/gi_balja/223069730719

// https://charming-kyu.tistory.com/39
