import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Bookmark } from '../bookmarks/bookmarks.entity';
import { Order } from '../orders/orders.entity';
import { Comment } from '../comments/comments.entity';

@Entity({ schema: 'coca', name: 'post' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'postId' })
  postId: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // comment 관계
  // Post : Comment = 1 : N

  //category 관계
  // Posts must exist whether an item in category is deleted or not.

  //user 관계
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  //bookmark 관계
  @OneToMany(() => Bookmark, (bookmark) => bookmark.post)
  bookmarks: Bookmark[];

  //order 관계
  @OneToMany(() => Order, (order) => order.post)
  orders: Order[];

  //comment 관계
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
