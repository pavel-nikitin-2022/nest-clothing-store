import { Controller, Get, Request, UseGuards, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { RequestWithUser } from '../auth/auth.controller';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CartGetSelfRes } from '../types/api/Cart';
import { ProductInCartCreateDto, ProductInCartUpdateDto } from './dto/productInCart.dto';
import { Product, ProductInCart } from '@prisma/client';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-cart')
  @ApiBearerAuth()
  async getMyCart(@Request() req: RequestWithUser): Promise<CartGetSelfRes> {
    const cart = await this.cartService.getUserCart(req.user.userId);
    const productsInCart = await this.cartService.getProductsInCart(cart.id);
    return { cart: { productsInCart, ...cart } };
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-product')
  @ApiBearerAuth()
  async addProductToCart(@Request() req: RequestWithUser, @Body() productDto: ProductInCartCreateDto): Promise<ProductInCart> {
    const cart = await this.cartService.getUserCart(req.user.userId);
    return this.cartService.addProductToCart(cart.id, productDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-product/:productInCartId')
  @ApiBearerAuth()
  async removeProductFromCart(@Param('productInCartId') productInCartId: string): Promise<void> {
    return this.cartService.removeProductFromCart(Number(productInCartId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-product/:productInCartId')
  @ApiBearerAuth()
  async updateProductInCart(@Param('productInCartId') productInCartId: string, @Body() productDto: ProductInCartUpdateDto): Promise<ProductInCart> {
    return this.cartService.updateProductInCart(Number(productInCartId), {count: productDto.count});
  }


}

