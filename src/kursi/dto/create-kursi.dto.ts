import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateKursiDto {
  @IsString()
  @IsNotEmpty()
  nomor!: string;

  @IsInt()
  gerbongId!: number;
}