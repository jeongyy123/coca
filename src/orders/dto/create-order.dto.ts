import { IsEnum, IsInt, IsNumber } from 'class-validator';
import { OrderType } from '../ordertype.enum';

export class CreateOrderDto {
  @IsInt() // 정수 확인
  postId: number;

  @IsEnum(OrderType)
  orderType: OrderType;

  @IsNumber() // 숫자 확인
  quantity: number;

  @IsNumber()
  amount: number;
}
