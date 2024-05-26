import { Bookmark } from 'src/bookmarks/bookmarks.entity';
import { Order } from 'src/orders/orders.entity';
import { User } from 'src/users/users.entity';
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
  @ManyToMany(() => Bookmark, (bookmark) => bookmark.posts)
  bookmarks: Bookmark;

  //order 관계
  @OneToMany(() => Order, (order) => order.post)
  orders: Order[];
}
