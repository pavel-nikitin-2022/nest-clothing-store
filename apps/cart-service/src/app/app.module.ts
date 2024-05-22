import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
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
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
