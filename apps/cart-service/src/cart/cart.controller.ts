import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { CartService } from './cart.service'
import {
  ProductInCartCreateDto,
  ProductInCartUpdateDto,
} from './dto/productInCart.dto'
import { Cart, ProductInCart } from '@prisma/client'
import { CartGetSelfRes } from '../types/api/Cart'

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'getUserCart' })
  async getUserCart(data: { userId: number }): Promise<CartGetSelfRes> {
    const cart = await this.cartService.getUserCart(data.userId)
    const productsInCart = await this.cartService.getProductsInCart(cart.id)
    return { cart: { productsInCart, ...cart } }
  }

  @MessagePattern({ cmd: 'addProductToCart' })
  async addProductToCart(data: {
    userId: number
    productDto: ProductInCartCreateDto
  }): Promise<ProductInCart> {
    const cart = await this.cartService.getUserCart(data.userId)
    return this.cartService.addProductToCart(cart.id, data.productDto)
  }

  @MessagePattern({ cmd: 'removeProductFromCart' })
  async removeProductFromCart(data: {
    productInCartId: number
  }): Promise<void> {
    return this.cartService.removeProductFromCart(data.productInCartId)
  }

  @MessagePattern({ cmd: 'updateProductInCart' })
  async updateProductInCart(data: {
    productInCartId: number
    productDto: ProductInCartUpdateDto
  }): Promise<ProductInCart> {
    return this.cartService.updateProductInCart(data.productInCartId, {
      count: data.productDto.count,
    })
  }

  @MessagePattern({ cmd: 'createCart' })
  async createCart(data: { userId: number }): Promise<Cart> {
    return this.cartService.createCart(data.userId)
  }
}
