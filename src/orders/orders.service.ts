import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersRepository } from './orders.repository';
import { OrderType } from './ordertype.enum';
import { PostsRepository } from 'src/posts/posts.repository';
import { User } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Post } from 'src/posts/posts.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: OrdersRepository,
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async addOrder(postId: number, req: any, quantity: number, amount: number) {
    const userId = req.user;

    const post = await this.postsRepository.findOne({ where: { postId } });

    if (!post) {
      throw new NotFoundException(`해당 게시글이 존재하지않습니다.`);
    }

    if (quantity > post.quantity) {
      throw new BadRequestException(`수량보다 많은 양을 주문할 수 없습니다.`);
    }

    const user = await this.usersRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`해당 유저가 존재하지않습니다.`);
    }

    const postUserId = post.user.userId;

    const order = this.ordersRepository.create({
      buyer: userId,
      seller: postUserId,
      orderType: OrderType.PENDING,
      quantity,
      amount,
      post,
    });

    return await this.ordersRepository.save(order);
  }
}
