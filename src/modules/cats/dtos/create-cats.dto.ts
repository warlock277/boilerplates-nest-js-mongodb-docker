import {
  IsDefined,
  IsNotEmpty,
} from 'class-validator';

export class CreateCatsDto {
  @IsDefined({
    message: 'Name is required',
  })
  @IsNotEmpty()
  name: string;

  @IsDefined({
    message: 'Age is required',
  })
  @IsNotEmpty()
  age: number;

  @IsDefined({
    message: 'Breed is required',
  })
  @IsNotEmpty()
  breed: string;
}
