import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPosts() {
    return this.postsRepository.find();
  }

  async getPostById(postId: number) {
    this.checkFindPost(postId);

    return this.postsRepository.findOne({ where: { postId } });
  }

  async createPost(
    req: any,
    title: string,
    content: string,
    quantity: number,
    amount: number,
  ) {
    const userId = req.user.userId;

    const user = await this.usersRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(
        `이메일 ${user.email}을 가진 계정이 없습니다.`,
      );
    }

    const post = this.postsRepository.create({
      title,
      author: user.nickname,
      content,
      quantity,
      amount,
    });

    return await this.postsRepository.save(post);
  }

  // auth를 통해서 본인이 쓴 게시글의 경우 수정
  // userid, password 확인
  async updatePost(
    postId: number,
    title: string,
    content: string,
    quantity: number,
    amount: number,
  ) {
    return this.postsRepository.update(postId, {
      title,
      content,
      quantity,
      amount,
    });
  }

  // auth를 통해서 본인이 쓴 게시글의 경우 삭제
  // userid, password 확인
  async deletePost(postId: number) {
    return this.postsRepository.softDelete(postId);
  }

  private async checkFindPost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { postId } });

    if (!post) {
      throw new NotFoundException(
        `해당 ${postId}를 가진 글이 존재하지않습니다.`,
      );
    }

    return post;
  }
}
