import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidatePhoneDto } from './dto/validate-phone.dto';
import { Phone, PhoneDocument } from './schemas/phone.schema';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel(Phone.name) private readonly phoneModel: Model<PhoneDocument>,
    private httpService: HttpService
  ) {}

  async validate(validatePhoneDto: ValidatePhoneDto): Promise<any> {
    const createdPhone = new this.phoneModel(validatePhoneDto);
    const apiAccessKey = '7edb59e89789d14df703a54882ee7110';
    const result = createdPhone.save();
    console.log('result', result);
    return this.httpService
      .get(
        'http://apilayer.net/api/validate?access_key=' +
          apiAccessKey +
          '&number=' +
          validatePhoneDto.phone +
          '&format=1&country_code=HK',
      )
      .pipe(map((response) => response.data));
  }

  async findAll(): Promise<Phone[]> {
    return this.phoneModel.find().exec();
  }
}
