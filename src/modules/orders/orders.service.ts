import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderType } from './ordertype.enum';
import { Order } from './orders.entity';
import { Post } from '../posts/posts.entity';
import { User } from '../users/users.entity';
import { OrdersRepository } from './orders.repository';
import { PostsRepository } from '../posts/posts.repository';
import { UsersRepository } from '../users/users.repository';

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

  async addOrder(
    postId: number,
    userId: number,
    quantity: number,
    amount: number,
  ) {
    const post = await this.postsRepository.findOne({ where: { postId } });

    if (!post) {
      throw new NotFoundException(`해당 게시글이 존재하지않습니다.`);
    }

    if (quantity > post.quantity) {
      throw new BadRequestException(`수량보다 많은 양을 주문할 수 없습니다.`);
    }

    const userPosted = await this.usersRepository.findOne({
      where: { nickname: post.author },
    });

    if (!userPosted) {
      throw new NotFoundException(`해당 유저가 존재하지않습니다.`);
    }

    const postUserId = userPosted.userId;

    const order = this.ordersRepository.create({
      buyer: userId,
      seller: postUserId,
      orderType: OrderType.PENDING,
      quantity,
      amount,
      post,
    });

    await this.ordersRepository.save(order);

    return { message: '주문이 완료되었습니다.', orderList: order };
  }

  async getOrders(userId: number) {
    const posts = await this.postsRepository.find({
      where: { user: { userId } },
    });

    if (!posts || posts.length === 0) {
      throw new NotFoundException(`주문한 내역이 없습니다.`);
    }

    return posts;
  }
}
