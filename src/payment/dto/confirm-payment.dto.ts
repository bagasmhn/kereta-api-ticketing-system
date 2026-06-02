import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ConfirmPaymentDto {
  @IsInt()
  transaksiId!: number;

  @IsNotEmpty()
  paymentRef!: string;

  @IsOptional()
  signature?: string;
}

