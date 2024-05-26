import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmarks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/configs/jwt.config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule { }
