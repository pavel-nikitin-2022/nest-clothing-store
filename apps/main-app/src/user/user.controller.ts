import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { RequestWithUser } from '@auth/auth.controller'
import { JwtAuthGuard } from '@auth/strategies/jwt.strategy'
import { ConfigService } from '@config/config.service'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { UserGetSelfRes } from '../types/api/User'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  async getSelf(@Request() req: RequestWithUser): Promise<UserGetSelfRes> {
    const user = await this.userService.getSelf(req.user.userId)
    return { user }
  }
}
