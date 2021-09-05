import { Body, Controller, Get, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { ValidatePhoneDto } from './dto/validate-phone.dto';
import { Phone } from './schemas/phone.schema';

@Controller('phones')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) { }

  @Post()
  async validate(@Body() validatePhoneDto: ValidatePhoneDto): Promise<any> {
    return await this.phoneService.validate(validatePhoneDto);
  }

  @Get()
  async findAll(): Promise<Phone[]> {
    return await this.phoneService.findAll();
  }
}
