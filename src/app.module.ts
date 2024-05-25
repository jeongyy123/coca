import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    BookmarkModule,
    BookmarksModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService],
})
export class AppModule {}
