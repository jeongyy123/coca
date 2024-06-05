import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';
import { Comment } from '../comments/comments.entity';
import { Bookmark } from '../bookmarks/bookmarks.entity';
import { UsersRepository } from '../users/users.repository';
import { PostsRepository } from '../posts/posts.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { BookmarksRepository } from '../bookmarks/bookmarks.repository';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(Comment)
    private readonly commentsRepository: CommentsRepository,
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: BookmarksRepository,
  ) {}

  // 내 프로필 조회
  async getMyprofile(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { userId, deletedAt: null },
      select: ['nickname', 'email', 'profileImg'],
    });

    if (!user) throw new NotFoundException(`해당 사용자의 정보가 없습니다.`);

    return user;
  }

  // 내 게시글 조회
  async getMyPosts(userId: number) {
    const posts = await this.postsRepository.find({
      where: { user: { userId }, deletedAt: null },
    });

    if (!posts || posts.length === 0)
      throw new NotFoundException(`작성한 글이 없어요.`);

    return posts;
  }

  // 내 댓글 조회
  async getMyComments(userId: number) {
    const comments = await this.commentsRepository.find({
      where: { user: { userId }, deletedAt: null },
    });

    if (!comments || comments.length === 0)
      throw new NotFoundException(`작성한 댓글이 없어요.`);

    return comments;
  }

  // 내 북마크 조회
  async getMyBookmarks(userId: number) {
    const bookmarks = await this.bookmarksRepository.find({
      where: { user: { userId, deletedAt: null } },
    });

    if (!bookmarks || bookmarks.length === 0)
      throw new NotFoundException(`북마크한게 없어요.`);

    return bookmarks;
  }

  // 다른 사람 프로필 조회
  async getOtherProfile(nickname: string) {
    const user = await this.usersRepository.findOne({
      where: { nickname: nickname['nickname'], deletedAt: null },
      select: ['nickname', 'profileImg'],
    });

    if (!user)
      throw new NotFoundException(
        `${nickname['nickname']}을 가진 사용자가 없습니다.`,
      );

    return user;
  }

  // 다른 사람이 작성한 게시글 조회
  async getOtherPosts(nickname: string) {
    const user = await this.findUser(nickname);

    const posts = await this.postsRepository.find({
      where: { user: { userId: user.userId }, deletedAt: null },
    });

    if (!posts || posts.length === 0)
      throw new NotFoundException(
        `해당 ${nickname['nickname']}님이 작성한 글이 없습니다.`,
      );

    return posts;
  }
  // 다른 사람이 작성한 댓글 조회
  async getOtherComments(nickname: string) {
    const user = await this.findUser(nickname);

    const comments = await this.commentsRepository.find({
      where: { user: { userId: user.userId }, deletedAt: null },
    });

    if (!comments || comments.length === 0)
      throw new NotFoundException(
        `해당 ${nickname['nickname']}님이 작성한 댓글이 없습니다.`,
      );

    return comments;
  }

  private async findUser(nickname: string) {
    const user = await this.usersRepository.findOne({
      where: { nickname: nickname['nickname'], deletedAt: null },
      select: ['userId'],
    });

    if (!user)
      throw new NotFoundException(
        `${nickname['nickname']}을 가진 사용자가 없습니다.`,
      );

    return user;
  }
}
