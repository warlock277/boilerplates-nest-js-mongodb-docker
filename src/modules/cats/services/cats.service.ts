import {HttpStatus, Injectable} from '@nestjs/common';
import { CatsRepository } from '../repositories/definitions/cats.repository.abstract';
import {CreateCatsDto, FilterCatsDto, UpdateCatsDto} from '@modules/cats/dtos';
import {ICats} from "@modules/cats/entities/definitions";
import {HttpException} from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class CatsService {
  constructor(private repository: CatsRepository) {}

  async create(createCatsDto: CreateCatsDto): Promise<any> {
    const Cats: ICats = await this.repository.create(createCatsDto);
    delete Cats.updated_at;
    return Cats;
  }
  async allCats(filter: FilterCatsDto) {
    return await this.repository.allCats(filter);
  }
  async findOneById(id: string) {
    const Cats = await this.repository.findCatsById(id);
    return Cats;
  }
  async update(
      id: string,
      updateCatsDto: UpdateCatsDto,
  ) {
    let Cats: ICats;
    try {
      Cats = await this.repository.findCatsById(id);
    } catch (e) {
      throw new HttpException(
          {
            message: `Cats Not Found with id: ${id}`,
          },
          HttpStatus.NOT_FOUND,
      );
    }
    return Cats;
  }
}
