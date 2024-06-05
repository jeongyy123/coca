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
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  async getComments(@Param('postId') postId: number) {
    return this.commentsService.getComments(postId);
  }
  @Post()
  async createComment(
    @Param('postId') postId: number,
    @Body() data: CreateCommentDto,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    return this.commentsService.createComment(postId, data.content, userId);
  }
  @Patch('/:commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() data: UpdateCommentDto,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    return this.commentsService.updateComment(commentId, data.content, userId);
  }
  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @Req() req: Request,
  ) {
    const userId = req.user['userId'];
    return this.commentsService.deleteComment(commentId, userId);
  }
}
