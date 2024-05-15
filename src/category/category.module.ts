import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
