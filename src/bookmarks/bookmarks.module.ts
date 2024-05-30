import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmarks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/configs/jwt.config.service';
import { User } from 'src/users/users.entity';
import { Post } from 'src/posts/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark, Post, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
