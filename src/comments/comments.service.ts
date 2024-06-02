import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentsRepository } from './comments.repository';
import { Post } from 'src/posts/posts.entity';
import { Comment } from './comments.entity';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entity';

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

  async createComment(
    postId: number,
    content: string,
    author: string,
    req: any,
  ) {
    const userId = req.user.userId;

    const post = await this.findPostById(postId);
    const user = await this.findUserById(userId);

    const newComment = this.commentsRepository.create({
      post,
      user,
      content,
      author,
    });

    return this.commentsRepository.save(newComment);
  }

  async updateComment(commentId: number, content: string) {
    const comment = await this.findCommentById(commentId);

    comment.content = content;

    return this.commentsRepository.save(comment);
  }

  async deleteComment(commentId: number) {
    const comment = await this.findCommentById(commentId);

    return await this.commentsRepository.softDelete(comment);
  }

  private async findPostById(postId: number) {
    const post = await this.postsRepository.findOne({ where: { postId } });

    if (!post) throw new NotFoundException(`해당 글이 존재하지않습니다.`);

    return post;
  }

  private async findUserById(userId: number) {
    const user = await this.usersRepository.findOne({ where: { userId } });

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
}
