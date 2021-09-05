import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { Phone, PhoneSchema } from './schemas/phone.schema';

@Module({
  imports: [HttpModule,
    MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule { }
