import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { Product } from '@prisma/client'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: 'number' })
  @ApiQuery({ name: 'maxPrice', required: false, type: 'number' })
  @ApiQuery({
    name: 'categoryNames',
    required: false,
    type: String,
    isArray: true,
    description: 'Array of category names separated by commas',
  })
  @Get()
  async getAllProducts(
    @Query('title') title?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('categoryNames') categoryNames?: string[]
  ): Promise<Product[]> {
    console.log(categoryNames)
    if (!Array.isArray(categoryNames)) categoryNames = [categoryNames]
    const parsedCategoryNames = categoryNames ? categoryNames : undefined
    return this.productService.getAllProducts(
      title,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      parsedCategoryNames
    )
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(Number(id))
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product
  }
  @Get('products-with-discounts/:discountId')
  async getProductsWithDiscounts(@Param('discountId') discountId: string): Promise<Product[]> {
    return this.productService.getProductsWithDiscounts(Number(discountId));
  }
}
