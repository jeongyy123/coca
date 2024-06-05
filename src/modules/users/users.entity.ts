import { Comment } from 'src/modules/comments/comments.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from '../bookmarks/bookmarks.entity';
import { Post } from '../posts/posts.entity';

@Entity({ schema: 'coca', name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
  userId: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  profileImg: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //bookmark 관계
  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  //post 관계
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  //comment 관계
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
