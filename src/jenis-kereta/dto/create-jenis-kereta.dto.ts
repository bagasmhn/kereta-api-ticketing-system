import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJenisKeretaDto {
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;
}