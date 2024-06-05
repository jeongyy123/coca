import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'coca', name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'categoryId' })
  categoryId: number;

  @Column('varchar')
  categoryName: string;

  // Posts must exist whether an item in category is deleted or not.
}
