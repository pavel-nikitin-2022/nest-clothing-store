import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from 'src/user/user.module'
import { AuthModule } from 'src/auth/auth.module'
import { ConfigModule } from 'src/config/config.module'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { CartModule } from 'src/cart/cart.module'
import { ProductModule } from 'src/product/product.module'
import { DiscountModule } from 'src/discount/discount.module'


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
    DiscountModule 
  ],
  controllers: [AppController],
})
export class AppModule {}
