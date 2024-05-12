import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigService } from '../config/config.service'
import { CartService } from 'src/cart/cart.service'

@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService, CartService],
  exports: [UserService],
})
export class UserModule {}
