import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber() // 숫자 확인
  quantity: number;

  @IsNumber()
  amount: number;
}
