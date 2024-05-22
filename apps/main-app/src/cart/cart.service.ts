import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductInCartCreateDto, ProductInCartUpdateDto } from './dto/productInCart.dto';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private readonly client: ClientProxy) {}

  getUserCart(userId: number) {
    return this.client.send({ cmd: 'getUserCart' }, { userId });
  }

  addProductToCart(userId: number, productDto: ProductInCartCreateDto) {
    return this.client.send({ cmd: 'addProductToCart' }, { userId, productDto });
  }

  removeProductFromCart(productInCartId: number) {
    return this.client.send({ cmd: 'removeProductFromCart' }, { productInCartId });
  }

  updateProductInCart(productInCartId: number, productDto: ProductInCartUpdateDto) {
    return this.client.send({ cmd: 'updateProductInCart' }, { productInCartId, productDto });
  }

  createCart(userId: number)  {
    return this.client.send({ cmd: 'createCart' }, { userId });
  }
}