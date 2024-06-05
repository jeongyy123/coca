import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Bookmark } from 'src/modules/bookmarks/bookmarks.entity';
import { Category } from 'src/modules/catagories/categories.entity';
import { Order } from 'src/modules/orders/orders.entity';
import { Post } from 'src/modules/posts/posts.entity';
import { Capsule } from 'src/modules/products/capsules.entity';
import { Machine } from 'src/modules/products/machines.entity';
import { User } from 'src/modules/users/users.entity';
import { Comment } from 'src/modules/comments/comments.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [
        Category,
        Bookmark,
        User,
        Order,
        Post,
        Machine,
        Capsule,
        Comment,
      ],
      schema: 'coca',
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
    };
  }
}
