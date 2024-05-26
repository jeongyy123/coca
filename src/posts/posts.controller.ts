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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get('/:postId')
  async getPostById(@Param() postId: number) {
    return await this.postsService.getPostById(postId);
  }

  @Post()
  async createPost(@Body() data: CreatePostDto, @Req() req: Request) {
    return this.postsService.createPost(
      req,
      data.title,
      data.content,
      data.quantity,
      data.amount,
    );
  }

  // auth를 통해서 본인이 쓴 게시글의 경우 수정
  // userid, password 확인
  @Patch('/:postId')
  async updatePost(@Param() postId: number, @Body() data) {
    return this.postsService.updatePost(
      postId,
      data.title,
      data.content,
      data.quantity,
      data.amount,
    );
  }

  @Delete('/:postId')
  // auth를 통해서 본인이 쓴 게시글의 경우 삭제
  // userid, password 확인
  async deletePost(@Param() postId: number) {
    return this.postsService.deletePost(postId);
  }
}
