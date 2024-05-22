import { Controller, Get, Request, UseGuards, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { RequestWithUser } from '../auth/auth.controller';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductInCartCreateDto, ProductInCartUpdateDto } from './dto/productInCart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-cart')
  @ApiBearerAuth()
  async getMyCart(@Request() req: RequestWithUser) {
    const response = await this.cartService.getUserCart(req.user.userId).toPromise();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-product')
  @ApiBearerAuth()
  async addProductToCart(@Request() req: RequestWithUser, @Body() productDto: ProductInCartCreateDto) {
    const response = await this.cartService.addProductToCart(req.user.userId, productDto).toPromise();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-product/:productInCartId')
  @ApiBearerAuth()
  async removeProductFromCart(@Param('productInCartId') productInCartId: string) {
    return this.cartService.removeProductFromCart(Number(productInCartId)).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-product/:productInCartId')
  @ApiBearerAuth()
  async updateProductInCart(@Param('productInCartId') productInCartId: string, @Body() productDto: ProductInCartUpdateDto) {
    const response = await this.cartService.updateProductInCart(Number(productInCartId), productDto).toPromise();
    return response;
  }
}