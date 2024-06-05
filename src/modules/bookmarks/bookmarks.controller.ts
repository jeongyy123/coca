import { Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Request } from 'express';

@Controller('/posts/:postId/bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async addBookmark(@Param('postId') postId: number, @Req() req: Request) {
    const userId = req.user['userId'];
    return await this.bookmarksService.addBookmark(postId, userId);
  }

  @Delete()
  async removeBookmark(@Param('postId') postId: number, @Req() req: Request) {
    const userId = req.user['userId'];
    return await this.bookmarksService.removeBookmark(postId, userId);
  }
}
