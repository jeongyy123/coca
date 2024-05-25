import { Post } from 'src/posts/posts.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'coca', name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'commentId' })
  commentId: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //comment관계 Post : Comment = 1 : N
  @ManyToOne(() => Post)
  post: Post;

  //user관계 설정
}
