import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices'

@Module({
  controllers: [CartController],
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
    CartService,
    PrismaService,
  ],
  exports: [CartService],
})
export class CartModule {}
