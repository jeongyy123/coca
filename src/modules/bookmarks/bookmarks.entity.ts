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
  @ManyToMany(() => Post, (post) => post.bookmarks)
  @JoinTable({
    name: 'post_bookmark', // 조인 테이블 이름
    joinColumn: { name: 'bookmarkId', referencedColumnName: 'bookmarkId' },
    inverseJoinColumn: { name: 'postId', referencedColumnName: 'postId' },
  })
  posts: Post[];
}
