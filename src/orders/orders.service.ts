import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersRepository } from './orders.repository';
import { OrderType } from './ordertype.enum';
import { PostsRepository } from 'src/posts/posts.repository';
import { User } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: OrdersRepository
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository
  ) { }


  async addOrder(postId: number, quantity: number, orderType: OrderType, req: any) {

    const userId = req.user;

    const post = await this.postsRepository.findOne({ where: { postId } })
    const user = await this.usersRepository.findOne({ where: { userId } })

    const order = this.ordersRepository.create({
      buyer: userId,
      seller: post.userId,

    })


    return this.ordersRepository.create({})
  }
}
