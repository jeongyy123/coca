import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from '../products/machines.entity';
import { Capsule } from '../products/capsules.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/configs/jwt.config.service';
import { MachinesRepository } from '../products/machines.repository';
import { CapsulesRepository } from '../products/capsules.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine, Capsule]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService, MachinesRepository, CapsulesRepository],
})
export class CrawlerModule {}
