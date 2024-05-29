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
    UserService,
    ConfigService,
    CartService,
  ],
  exports: [UserService],
})
export class UserModule {}
