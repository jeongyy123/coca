import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
}
