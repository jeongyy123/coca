import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { User } from '../users/users.entity';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPosts() {
    return this.postsRepository.find({ select: ['title', 'author', 'amount'] });
  }

  async getPostById(postId: number) {
    this.checkFindPost(postId);

    return this.postsRepository.findOne({
      where: { postId },
    });
  }

  async createPost(
    userId: number,
    title: string,
    content: string,
    quantity: number,
    amount: number,
  ) {
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
    userId: number,
    title: string,
    content: string,
    quantity: number,
    amount: number,
  ) {
    const post = await this.postsRepository.findOne({
      where: { user: { userId } },
    });

    if (!post) {
      throw new NotFoundException(`수정할 게시글이 없습니다.`);
    }

    const newTitle = title;
    const newContent = content;
    const newQuantity = quantity;
    const newAmount = amount;

    await this.postsRepository.update(postId, {
      title: title ? newTitle : title,
      content: content ? newContent : content,
      quantity: quantity ? newQuantity : quantity,
      amount: amount ? newAmount : amount,
    });

    return { message: '게시글 수정이 완료되었습니다.' };
  }

  // auth를 통해서 본인이 쓴 게시글의 경우 삭제
  // userid, password 확인
  async deletePost(postId: number) {
    await this.checkFindPost(postId);

    return this.postsRepository.softDelete(postId);
  }

  private async checkFindPost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { postId },
    });

    if (!post) {
      throw new NotFoundException(`해당 게시글이 존재하지않습니다.`);
    }

    return { message: '게시글이 삭제되었습니다.' };
  }
}
