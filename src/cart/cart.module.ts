import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService], 
})
export class CartModule {}
