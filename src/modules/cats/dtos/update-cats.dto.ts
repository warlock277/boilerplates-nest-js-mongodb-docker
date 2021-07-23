import { PartialType } from '@nestjs/mapped-types';
import { CreateCatsDto } from './create-cats.dto';

export class UpdateCatsDto extends PartialType(CreateCatsDto) {}

