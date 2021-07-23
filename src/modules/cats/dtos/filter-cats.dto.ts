import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterCatsDto {
  @IsOptional()
  @IsNotEmpty()
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  limit?: number;

  @IsOptional()
  @IsNotEmpty()
  _id?: string;

  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  age?: number;

  @IsOptional()
  @IsNotEmpty()
  breed?: string;
}
