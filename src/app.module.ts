import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CrawlerModule } from './crawler/crawler.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/typeorm.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './configs/jwt.config.service';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';

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
    BookmarksModule,
    UsersModule,
    OrdersModule,
    CrawlerModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes(
//         { path: 'category', method: RequestMethod.POST },
//         { path: 'category/:categoryId', method: RequestMethod.PATCH },
//         { path: 'category/:categoryId', method: RequestMethod.DELETE },
//         { path: 'menu/:categoryId', method: RequestMethod.POST },
//         { path: 'menu/:categoryId/:menuId', method: RequestMethod.PATCH },
//         { path: 'menu/:categoryId/:menuId', method: RequestMethod.DELETE },
//         { path: 'order', method: RequestMethod.POST },
//         { path: 'order/customer', method: RequestMethod.GET },
//         { path: 'order/owner', method: RequestMethod.GET },
//         { path: 'order/:orderId/status', method: RequestMethod.PATCH },
//       );
//   }
// }
