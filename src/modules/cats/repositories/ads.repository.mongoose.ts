import { CatsRepository } from './definitions/cats.repository.abstract';
import { Cats, CatsDocument } from '../entities/cats.entity';
import { ICats } from '@modules/cats/entities/definitions';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCatsDto } from '../dtos/update-cats.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CreateCatsDto } from '../dtos/create-cats.dto';
import { ConfigService } from '@nestjs/config';
import { FilterCatsDto } from '../dtos/filter-cats.dto';

@Injectable()
export class CatsRepositoryMongo extends CatsRepository {
  constructor(
    @InjectModel(Cats.name) private model: Model<CatsDocument>,
    private configService: ConfigService,
  ) {
    super();
  }

  async create(obj: CreateCatsDto): Promise<ICats> {
    const cats_info: any = obj;
    const createdCats: CatsDocument = await this.model.create(cats_info);
    return <ICats>createdCats?.toJSON();
  }
  async findCatsById(id: string): Promise<any> {
    const catsObj: CatsDocument = await this.model.findById(id);
    if (!catsObj) {
      throw new HttpException(
        { message: 'Cats not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return catsObj;
  }
  async allCats(filter: FilterCatsDto): Promise<any> {
    const limit = Number(filter.limit) || 10;
    const page = Number(filter.page) || 1;
    const querySpec: any = {};
    
    if (filter.name) {
      querySpec.name = filter.name;
    }
    if (filter.breed) {
      querySpec.breed = filter.breed;
    }
    if (filter.age) {
      querySpec.age = filter.age;
    }
    const allCatsQuery = await this.model
      .find(querySpec, { __v: 0, updated_at: 0 })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ created_at: -1 })
      .lean();

    const countQuery = await this.model.countDocuments(querySpec);
    const [count, result] = await Promise.all([countQuery, allCatsQuery]);
    return { count, cats: result };
  }
  async updateCats(
    slug: string,
    update: UpdateCatsDto,
    username: string,
  ): Promise<any> {
    const cats_update_data: any = update;
    const updatedCats = await this.model.findOneAndUpdate(
      { slug: slug },
      { $set: cats_update_data },
      { runValidators: true, new: true },
    );
    return {
      cats: updatedCats?.toJSON(),
    };
  }
}
