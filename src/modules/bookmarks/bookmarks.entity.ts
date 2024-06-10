import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

@Entity({ schema: 'coca', name: 'bookmark' })
export class Bookmark {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bookmarkId' })
  bookmarkId: number;

  @Column()
  bookmark: boolean;

  //user 관계
  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  //post 관계
  @ManyToOne(() => Post, (post) => post.bookmarks)
  post: Post;
}
