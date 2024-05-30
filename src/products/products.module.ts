import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './machines.entity';
import { Capsule } from './capsules.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/configs/jwt.config.service';
import { CapsulesRepository } from './capsules.repository';
import { MachinesRepository } from './machines.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine, Capsule]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, MachinesRepository, CapsulesRepository],
})
export class ProductsModule {}
