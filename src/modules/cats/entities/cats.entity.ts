import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICats } from './definitions/cats.entity.interface';
export type CatsDocument = Document<Cats>;

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Cats implements ICats {
  _id?: any;

  @Prop({
    required: [true, 'Cats Title is required'],
    trim: true,
    index: true,
  })
  name: string;

  @Prop({
    required: [true, 'Cats Age is required'],
    trim: true,
    index: true,
  })
  age: number;

  @Prop({
    required: [true, 'Cats Breed is required'],
    trim: true,
    index: true,
  })
  breed: string;


}

export const CatsSchema = SchemaFactory.createForClass(Cats);

CatsSchema.index({
  _id: 1,
  name: 1,
});
