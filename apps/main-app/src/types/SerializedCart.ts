import { Cart, ProductInCart } from '@prisma/client'

export type SerializedCart = Omit<Cart, 'password' | 'refreshToken'> & {
  productsInCart: ProductInCart[]
}
