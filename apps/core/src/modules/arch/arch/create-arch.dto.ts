import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsBoolean, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ArchError, ChainError, StructError } from '@elyasbr/tools-chain/dist/src';

export class CreateArchDto {
  @ApiProperty()
  @IsMongoId({
    message : JSON.stringify(ChainError.PATTERN_CHAIN_ID_IS_WRONG)
  })
  @Allow()
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
  @Allow()
  slug : string

  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @IsString({
    message : JSON.stringify(ArchError.SYMBOL_FIELD_ARCH_IS_REQUIRED)
  })
  @Allow()
  symbol : string

  @ApiProperty()
  @IsBoolean({
    message : JSON.stringify(ArchError.STATUS_FIELD_ARCH_IS_REQUIRED)
  })
  @Allow()
  status :Boolean
}