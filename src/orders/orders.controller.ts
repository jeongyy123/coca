import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderType } from './ordertype.enum';
import { Request } from 'express';

@Controller('/posts/:postId/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async addOrder(
    @Param('postId') postId: number,
    @Req() req: Request,
    @Body() quantity: number,
    @Body() orderType: OrderType,
  ) {
    return this.ordersService.addOrder(postId, quantity, orderType, req);
  }
}
