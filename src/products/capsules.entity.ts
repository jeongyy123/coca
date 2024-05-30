import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'coca', name: 'capsule' })
export class Capsule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'capsuleId' })
  capsuleId: number;

  @Column()
  capsuleName: string;

  @Column()
  capsuleImgUrl: string;

  @Column()
  capsuleQuantity: number;

  @Column()
  capsuleAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
