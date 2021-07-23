import { ICats } from '@modules/cats/entities/definitions';
import { CreateCatsDto } from '../../dtos/create-cats.dto';
import {
  UpdateCatsDto} from '@modules/cats/dtos/update-cats.dto';
import { FilterCatsDto } from '../../dtos/filter-cats.dto';

export abstract class CatsRepository {
  abstract create(obj: CreateCatsDto): Promise<ICats>;
  abstract allCats(filter: FilterCatsDto): Promise<ICats>;
  abstract findCatsById(id: string): Promise<ICats>;
  abstract updateCats(
    slug: string,
    update: UpdateCatsDto,
    username: string,
  ): Promise<any>;
}
