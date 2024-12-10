import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsBoolean, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ArchError, ChainError } from '@elyasbr/tools-chain/dist/src';

export class UpdateArchDto {
  @ApiProperty()
  @IsMongoId({
    message : JSON.stringify(ChainError.PATTERN_CHAIN_ID_IS_WRONG)
  })
  chainId : string

  @ApiPropertyOptional({
    default : 1
  })
  @IsNumber({} ,{ message : JSON.stringify(ArchError.RATE_WITHDRAW_FIELD_ARCH_IS_REQUIRED)})
  rateWithdraw : number


  @ApiProperty()
  @IsString({
    message : JSON.stringify(ArchError.SLUG_FIELD_ARCH_IS_REQUIRED)
  })
  slug : string

  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @IsString({
    message : JSON.stringify(ArchError.SYMBOL_FIELD_ARCH_IS_REQUIRED)
  })
  symbol : string

  @ApiProperty()
  @IsBoolean({
    message : JSON.stringify(ArchError.STATUS_FIELD_ARCH_IS_REQUIRED)
  })
  status :Boolean
}