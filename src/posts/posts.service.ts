import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
  ) {}

  async getPosts() {
    return this.postsRepository.find();
  }

  async getPostById(postId: number) {
    this.checkFindPost(postId);

    return this.postsRepository.findOne({ where: { postId } });
  }

  async createPost(title: string, author: string, content: string) {
    return this.postsRepository.create({ title, author, content });
  }

  // auth를 통해서 본인이 쓴 게시글의 경우 수정
  // userid, password 확인
  async updatePost(postId: number, title: string, content: string) {
    return this.postsRepository.update(postId, { title, content });
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
