import { IsOptional, IsString } from 'class-validator';

export class UpdateJenisKeretaDto {
  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;
}