import { PartialType } from '@nestjs/mapped-types';
import { CreateGerbongDto } from './create-gerbong.dto';

export class UpdateGerbongDto extends PartialType(
  CreateGerbongDto,
) {}