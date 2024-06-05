import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bookmark } from './bookmarks.entity';

@Injectable()
export class BookmarksRepository extends Repository<Bookmark> {
  constructor(private dataSource: DataSource) {
    super(Bookmark, dataSource.createEntityManager());
  }
}
