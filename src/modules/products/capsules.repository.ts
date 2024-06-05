import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Capsule } from './capsules.entity';

@Injectable()
export class CapsulesRepository extends Repository<Capsule> {
  constructor(private dataSource: DataSource) {
    super(Capsule, dataSource.createEntityManager());
  }
}
