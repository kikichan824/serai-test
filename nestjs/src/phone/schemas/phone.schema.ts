import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhoneDocument = Phone & Document;

@Schema()
export class Phone {
  @Prop()
  phone: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
