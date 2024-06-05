import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('/posts')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/:postId/orders')
  async addOrder(
    @Param('postId') postId: number,
    @Req() req: Request,
    @Body() data: CreateOrderDto,
  ) {
    const userId = req.user['userId'];
    return this.ordersService.addOrder(
      postId,
      userId,
      data.quantity,
      data.amount,
    );
  }

  // 내 게시글에 대한 주문들 조회
  @Get('/myposts/orders')
  async getOrders(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.ordersService.getOrders(userId);
  }
}
