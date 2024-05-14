import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { Product } from '@prisma/client'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(
    title?: string,
    minPrice?: string,
    maxPrice?: string,
    categoryNames?: string[]
  ): Promise<Product[]> {
    const where = {}

    if (title) {
      Object.assign(where, { title: { contains: title } })
    }

    if (minPrice !== undefined) {
      Object.assign(where, { price: { gte: minPrice } })
    }

    if (maxPrice !== undefined) {
      Object.assign(where, { price: { lte: maxPrice } })
    }

    if (categoryNames && categoryNames.length > 0) {
      const categoryIds = await this.getCategoryIdsByNames(categoryNames)
      Object.assign(where, {
        categories: { some: { id: { in: categoryIds } } },
      })
    }

    return this.prisma.product.findMany({
      where,
    })
  }

  async getCategoryIdsByNames(categoryNames: string[]): Promise<number[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        title: {
          in: categoryNames,
        },
      },
      select: {
        id: true,
      },
    })

    return categories.map((category) => category.id)
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product
  }

  async getProductsWithDiscounts(discountId: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        discountId: discountId
      }
    });
  }
}
