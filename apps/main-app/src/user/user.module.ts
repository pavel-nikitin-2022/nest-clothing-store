import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigService } from '../config/config.service'
import { CartService } from '@cart/cart.service'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'CART_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3001,
          },
        })
      },
      inject: [],
    },
    UserService,
    ConfigService,
    CartService,
  ],
  exports: [UserService],
})
export class UserModule {}
