import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Discount } from '@prisma/client';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}

  async getAllDiscounts(): Promise<Discount[]> {
    return this.prisma.discount.findMany();
  }
}