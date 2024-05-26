import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarksRepository } from './bookmarks.repository';
import { Bookmark } from './bookmarks.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { Post } from 'src/posts/posts.entity';
import { User } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: BookmarksRepository,
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async addBookmark(postId: number, req: any) {
    const { userId } = req.user.userId;

    const post = await this.postsRepository.findOne({ where: { postId } });
    const user = await this.usersRepository.findOne({ where: { userId } });

    const bookmark = this.bookmarksRepository.create({
      bookmark: true,
      user,
      posts: [post],
    });

    return await this.bookmarksRepository.save(bookmark);
  }

  async removeBookmark(postId: number, req: any) {
    const { userId } = req.user;

    const bookmark = await this.bookmarksRepository.findOne({
      where: {
        user: { userId },
        posts: { postId },
      },
      relations: ['posts', 'users'],
    });

    if (!bookmark) {
      throw new NotFoundException(`삭제할 북마크가 없습니다.`);
    }
    return await this.bookmarksRepository.remove(bookmark);
  }
}
