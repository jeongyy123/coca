import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

/**
 *JwtConfigService: JWT 모듈을 설정하는 역할.
 *주로 비밀 키와 만료 시간 같은 설정 값을 제공합니다.
 *JwtModule을 등록할 때 사용됩니다.
 */

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
      signOptions: { expiresIn: '1h' },
    };
  }
}
