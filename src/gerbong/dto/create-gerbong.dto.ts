import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateGerbongDto {
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsInt()
  kapasitas!: number;

  @IsInt()
  jadwalId!: number;
}