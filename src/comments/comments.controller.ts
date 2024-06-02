import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from './comments.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  async getComments(@Param() postId: number) {
    return this.commentsService.getComments(postId);
  }
  @Post()
  async createComment(
    @Param() postId: number,
    @Body() data,
    @Req() req: Request,
  ) {
    return this.commentsService.createComment(
      postId,
      data.content,
      data.author,
      req,
    );
  }
  @Patch('/:commentId')
  async updateComment(@Param() commentId: number, @Body() data) {
    return this.commentsService.updateComment(commentId, data.content);
  }
  @Delete('/:commentId')
  async deleteComment(@Param() commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
