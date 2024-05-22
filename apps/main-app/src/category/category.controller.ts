import { Controller, Get } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from '@prisma/client'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory()
  }
}
