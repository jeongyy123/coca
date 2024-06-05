import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/machines')
  async getMachines() {
    return await this.productsService.getMachines();
  }

  @Get('/machines/:machineId')
  async getMachineById(@Param('machineId') machineId: number) {
    return await this.productsService.getMachineById(machineId);
  }

  @Get('/capsules')
  async getCapsules() {
    return await this.productsService.getCapsules();
  }

  @Get('/capsules/:capsuleId')
  async getCapsuleById(@Param('capsuleId') capsuleId: number) {
    return await this.productsService.getCapsuleById(capsuleId);
  }
}
