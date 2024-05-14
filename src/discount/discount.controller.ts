import { Controller, Get } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('discounts')
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  async getAllDiscounts(): Promise<Discount[]> {
    return this.discountService.getAllDiscounts();
  }
}