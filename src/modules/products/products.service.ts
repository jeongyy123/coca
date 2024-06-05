import { Injectable, NotFoundException } from '@nestjs/common';
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
    const machine = await this.machinesRepository.findOne({
      where: { machineId, deletedAt: null },
      select: ['machineName', 'machineImgUrl', 'machineAmount'],
    });
    if (!machine) throw new NotFoundException(`해당 상품은 존재하지 않습니다.`);

    return machine;
  }

  async getCapsules() {
    return await this.capsulesRepository.find({ where: { deletedAt: null } });
  }

  async getCapsuleById(capsuleId: number) {
    const capsule = await this.capsulesRepository.findOne({
      where: { capsuleId, deletedAt: null },
      select: ['capsuleName', 'capsuleImgUrl', 'capsuleAmount'],
    });

    if (!capsule) throw new NotFoundException(`해당 상품은 존재하지 않습니다.`);

    return capsule;
  }
}
