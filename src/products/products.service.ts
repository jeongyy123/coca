import { Injectable } from '@nestjs/common';
import { MachinesRepository } from './machines.repository';
import { CapsulesRepository } from './capsules.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly machinesRepository: MachinesRepository,
    private readonly capsulesRepository: CapsulesRepository,
  ) {}

  async getMachines() {
    return await this.machinesRepository.find({ where: { deletedAt: null } });
  }

  async getMachineById(machineId: number) {
    return await this.machinesRepository.findOne({
      where: { machineId, deletedAt: null },
    });
  }

  async getCapsules() {
    return await this.capsulesRepository.find({ where: { deletedAt: null } });
  }

  async getCapsuleById(capsuleId: number) {
    return await this.capsulesRepository.findOne({
      where: { capsuleId, deletedAt: null },
    });
  }
}
