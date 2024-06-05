import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Machine } from './machines.entity';

@Injectable()
export class MachinesRepository extends Repository<Machine> {
  constructor(private dataSource: DataSource) {
    super(Machine, dataSource.createEntityManager());
  }
}
