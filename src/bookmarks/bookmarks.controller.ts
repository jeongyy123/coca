import { Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Request } from 'express';

@Controller('/posts/:postId/bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async addBookmark(@Param('postId') postId: number, @Req() req: Request) {
    return await this.bookmarksService.addBookmark(postId, req);
  }

  @Delete()
  async removeBookmark(@Param('postId') postId: number, @Req() req: Request) {
    return await this.bookmarksService.removeBookmark(postId, req);
  }
}
