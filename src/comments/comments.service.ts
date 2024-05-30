import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentsRepository } from './comments.repository';
import { Post } from 'src/posts/posts.entity';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  // constructor(
  //   @InjectRepository(Comment)
  //   @InjectRepository(Post)
  //   private readonly commentsRepository: CommentsRepository,
  //   private readonly postsRepository: PostsRepository,
  // ) {}
  // async getComments(postId: number) {
  //   await this.findPostById(postId);
  //   return this.commentsRepository.find({ where: { postId } });
  // }
  // async createComment(postId: number, content: string, author: string) {
  //   await this.findPostById(postId);
  //   return this.commentsRepository.create({ postId, content, author });
  // }
  // async updateComment(postId: number, commentId: number, content: string) {
  //   return await this.commentsRepository.update(postId, commentId, { content });
  // }
  // async deleteComment(postId: number, commentId: number) {
  //   return await this.commentsRepository.softDelete({ postId, commentId });
  // }
  // private async findPostById(postId: number) {
  //   const post = await this.postsRepository.findOne({ where: { postId } });
  //   if (!post) {
  //     throw new NotFoundException(
  //       `해당 ${postId}를 가진 글이 존재하지않습니다.`,
  //     );
  //   }
  //   return post;
  // }
}
