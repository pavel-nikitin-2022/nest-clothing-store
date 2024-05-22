import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from '@user/user.module'
import { AuthModule } from '@auth/auth.module'
import { ConfigModule } from '@config/config.module'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { CartModule } from '@cart/cart.module'
import { ProductModule } from '@product/product.module'
import { DiscountModule } from '@discount/discount.module'
import { CategoryModule } from '@category/category.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    UserModule,
    AuthModule,
    CartModule,
    ProductModule,
    DiscountModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
