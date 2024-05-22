import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService, PrismaService],
  exports: [DiscountService], 
})
export class DiscountModule {}