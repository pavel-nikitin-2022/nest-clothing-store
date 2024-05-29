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
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://rabbitmq:5672'],
            queue: 'cart_service_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
    CartService,
    PrismaService,
  ],
  exports: [CartService],
})
export class CartModule {}
