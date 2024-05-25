import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderType } from './ordertype.enum';
import { Post } from 'src/posts/posts.entity';

@Entity({ schema: 'coca', name: 'order' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'orderId' })
  orderId: number;

  @Column()
  orderType: OrderType;

  // post.userId가 들어갈거임.
  @Column()
  seller: number;

  // 주문하기를 누른 자
  @Column()
  buyer: number;

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

  //post 관계 post: order = 1 : N
  @ManyToOne(() => Post, (post) => post.orders)
  post: Post;
}
