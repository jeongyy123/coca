import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('/posts/:postId/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(
    @Param('postId') postId: number,
    @Req() req: Request,
    @Body() data: CreateOrderDto,
  ) {
    return this.ordersService.addOrder(postId, req, data.quantity, data.amount);
  }
}
