import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateJadwalDto {
  @IsString()
  @IsNotEmpty()
  asal!: string;

  @IsString()
  @IsNotEmpty()
  tujuan!: string;

  @IsDateString()
  tanggalBerangkat!: Date;

  @IsString()
  jamBerangkat!: string;

  @IsString()
  jamTiba!: string;

  @IsInt()
  harga!: number;

  @IsInt()
  jenisKeretaId!: number;
}