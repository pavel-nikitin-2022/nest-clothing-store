import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class ProductInCartCreateDto {
  @ApiProperty({
    description: 'Product id Reference',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Products count',
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;
}

export class ProductInCartUpdateDto {
  @ApiProperty({
    description: 'Count',
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;
}