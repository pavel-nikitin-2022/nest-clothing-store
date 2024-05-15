import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategory(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}