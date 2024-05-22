import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService], 
})
export class ProductModule {}
