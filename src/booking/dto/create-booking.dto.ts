import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class PenumpangDto {
  @IsString()
  @IsNotEmpty()
  namaPenumpang!: string;

  @IsString()
  @IsNotEmpty()
  nik!: string;

  @IsInt()
  kursiId!: number;
}

export class CreateBookingDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PenumpangDto)
  penumpang!: PenumpangDto[];
}