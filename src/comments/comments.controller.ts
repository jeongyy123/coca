import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(@Param() postId: number) {
    return this.commentsService.getComments(postId);
  }

  @Post()
  async createComment(@Param() postId: number, @Body() data) {
    return this.commentsService.createComment(
      postId,
      data.content,
      data.author,
    );
  }

  @Patch('/:commentId')
  async updateComment(
    @Param() postId: number,
    @Param() commentId: number,
    @Body() data,
  ) {
    return this.commentsService.updateComment(postId, commentId, data.content);
  }

  @Delete('/:commentId')
  async deleteComment(@Param() postId: number, @Param() commentId: number) {
    return this.commentsService.deleteComment(postId, commentId);
  }
}
