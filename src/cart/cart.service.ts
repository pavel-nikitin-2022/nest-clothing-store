import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma'; // Предполагается, что у вас есть сервис для работы с Prisma
import { Cart, Product, ProductInCart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(userId: number): Promise<Cart> {
    const newCart = await this.prisma.cart.create({
      data: {
        totalPrice: 0, // Установите начальную стоимость корзины
        User: {
          connect: { id: userId }, // Связываем корзину с пользователем
        },
      },
    });
    return newCart;
  }

  async getUserCart(userId: number): Promise<Cart | null> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async getProductsInCart(cartId: number): Promise<ProductInCart[]> {
    const productsInCart = await this.prisma.productInCart.findMany({
      where: {
        cartId: cartId,
      },
    });

    return productsInCart;
  }

  async addProductToCart(cartId: number, product: Omit<ProductInCart, 'id' | 'cartId'>): Promise<ProductInCart> {
    const newProductInCart = await this.prisma.productInCart.create({
      data: {
        ...product,
        cartId
      },
    });

    return newProductInCart;
  }

  async removeProductFromCart(productInCartId: number): Promise<void> {
    await this.prisma.productInCart.delete({
      where: {
        id: productInCartId,
      },
    });
  }

  async updateProductInCart(productInCartId: number, updatedProductData: Partial<ProductInCart>): Promise<ProductInCart> {
    const updatedProduct = await this.prisma.productInCart.update({
      where: {
        id: productInCartId,
      },
      data: updatedProductData,
    });
  
    return updatedProduct;
  }


}