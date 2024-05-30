import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'coca', name: 'machine' })
export class Machine {
  @PrimaryGeneratedColumn({ type: 'int', name: 'machineId' })
  machineId: number;

  @Column()
  machineName: string;

  @Column()
  machineImgUrl: string;

  @Column()
  machineAmount: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
