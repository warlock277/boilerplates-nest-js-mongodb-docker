import { HttpModule, Module } from '@nestjs/common';
import { CatsService } from './services';
import {
  CatsController,
} from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Cats, CatsSchema } from './entities/cats.entity';
import { CatsRepository } from '@modules/cats/repositories/definitions';
import { CatsRepositoryMongo } from '@modules/cats/repositories';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cats.name, schema: CatsSchema }]),
    HttpModule,
  ],

  providers: [
    {
      provide: CatsRepository,
      useClass: CatsRepositoryMongo,
    },
    CatsService,
    ConfigService,
  ],
  controllers: [CatsController],
  exports: [CatsRepository],
})
export class CatsModule {}
