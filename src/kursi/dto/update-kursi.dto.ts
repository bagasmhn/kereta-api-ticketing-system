import { PartialType } from '@nestjs/mapped-types';
import { CreateKursiDto } from './create-kursi.dto';

export class UpdateKursiDto extends PartialType(
  CreateKursiDto,
) {}