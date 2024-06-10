import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarksRepository } from './bookmarks.repository';
import { Bookmark } from './bookmarks.entity';
import { User } from '../users/users.entity';
import { PostsRepository } from '../posts/posts.repository';
import { UsersRepository } from '../users/users.repository';
import { Post } from '../posts/posts.entity';

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

  async addBookmark(postId: number, userId: number) {
    const post = await this.postsRepository.findOne({ where: { postId } });
    const user = await this.usersRepository.findOne({ where: { userId } });
    const bookmark = await this.bookmarksRepository.findOne({
      where: { user: { userId }, post: { postId } },
    });

    if (!post || !user) {
      throw new NotFoundException(`해당 게시글 또는 유저를 찾을 수 없습니다.`);
    }

    if (bookmark) {
      throw new ConflictException(`이미 북마크한 게시글입니다.`);
    }

    const newBookmark = this.bookmarksRepository.create({
      bookmark: true,
      user,
      post,
    });

    await this.bookmarksRepository.save(newBookmark);

    return { message: '북마크 완료' };
  }

  async removeBookmark(postId: number, userId: number) {
    const bookmark = await this.bookmarksRepository.findOne({
      where: {
        user: { userId },
        post: { postId },
      },
    });

    if (!bookmark) {
      throw new NotFoundException(`해제할 북마크가 없습니다.`);
    }

    await this.bookmarksRepository.delete({ bookmarkId: bookmark.bookmarkId });

    return { message: '북마크 해제 완료' };
  }
}
