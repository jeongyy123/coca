import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comments/comments.entity';
import { Post } from '../posts/posts.entity';
import { User } from '../users/users.entity';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../posts/posts.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: CommentsRepository,
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getComments(postId: number) {
    await this.findPostById(postId);

    return this.commentsRepository.find({ where: { post: { postId } } });
  }

  async createComment(postId: number, content: string, userId: number) {
    const post = await this.findPostById(postId);
    const user = await this.findUserById(userId);

    const newComment = this.commentsRepository.create({
      post,
      user,
      content,
      author: user.nickname,
    });

    await this.commentsRepository.save(newComment);

    return { message: '댓글이 작성되었습니다.' };
  }

  async updateComment(commentId: number, content: string, userId: number) {
    const comment = await this.checkAuthentication(commentId, userId);

    comment.content = content;

    this.commentsRepository.save(comment);

    return { message: '댓글 수정했습니다.' };
  }

  async deleteComment(commentId: number, userId: number) {
    await this.checkAuthentication(commentId, userId);

    await this.commentsRepository.softDelete(commentId);

    return { message: '댓글 삭제했습니다.' };
  }

  private async findPostById(postId: number) {
    const post = await this.postsRepository.findOne({ where: { postId } });

    if (!post) throw new NotFoundException(`해당 글이 존재하지않습니다.`);

    return post;
  }

  private async findUserById(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { userId },
      select: ['nickname'],
    });

    if (!user) throw new NotFoundException(`해당 유저가 없습니다.`);

    return user;
  }

  private async findCommentById(commentId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { commentId },
    });

    if (!comment) throw new NotFoundException(`해당 댓글은 존재하지 않습니다.`);

    return comment;
  }

  private async checkAuthentication(commentId: number, userId: number) {
    const comment = await this.findCommentById(commentId);
    const user = await this.findUserById(userId);

    if (comment.author !== user.nickname) {
      throw new UnauthorizedException(`수정 권한이 없습니다.`);
    }

    return comment;
  }
}
