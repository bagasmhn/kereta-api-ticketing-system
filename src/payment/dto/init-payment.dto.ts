import { IsIn, IsInt } from 'class-validator';

export class InitPaymentDto {
  @IsInt()
  transaksiId!: number;

  @IsIn(['QRIS', 'EWALLET'])
  paymentMethod!: 'QRIS' | 'EWALLET';
}

