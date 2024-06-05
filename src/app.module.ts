import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './configs/jwt.config.service';
import { ProductsModule } from './modules/products/products.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { TypeOrmConfigService } from './configs/typeorm.config.service';
import { PostsModule } from './modules/posts/posts.module';
import { BookmarksModule } from './modules/bookmarks/bookmarks.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CrawlerModule } from './modules/crawler/crawler.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    PostsModule,
    CommentsModule,
    BookmarksModule,
    UsersModule,
    OrdersModule,
    CrawlerModule,
    ProductsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'users/self/edit',
        method: RequestMethod.PATCH,
      },
      {
        path: '/users/profile/self',
        method: RequestMethod.GET,
      },
      {
        path: '/users/profile/self/posts',
        method: RequestMethod.GET,
      },
      {
        path: '/users/profile/self/comments',
        method: RequestMethod.GET,
      },
      {
        path: '/users/profile/self/bookmarks',
        method: RequestMethod.GET,
      },
      {
        path: '/posts',
        method: RequestMethod.POST,
      },
      {
        path: '/posts/:postId',
        method: RequestMethod.PATCH,
      },
      {
        path: '/posts/:postId/orders',
        method: RequestMethod.POST,
      },
      {
        path: '/posts/myposts/orders',
        method: RequestMethod.GET,
      },
      {
        path: '/posts/:postId/comments',
        method: RequestMethod.POST,
      },
      {
        path: '/posts/:postId/comments/:commentId',
        method: RequestMethod.PATCH,
      },
      {
        path: '/posts/:postId/comments/:commentId',
        method: RequestMethod.DELETE,
      },
      {
        path: '/posts/:postId/bookmarks',
        method: RequestMethod.POST,
      },
      {
        path: '/posts/:postId/bookmarks',
        method: RequestMethod.DELETE,
      },
    );
  }
}
