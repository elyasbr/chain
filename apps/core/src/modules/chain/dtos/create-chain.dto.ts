import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ChainError, StructError } from '@elyasbr/tools-chain/dist/src';

export class CreateChainDto {
  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(StructError.PATTERN_STRUCT_ID_IS_WRONG)
  })
  structId : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(ChainError.SLUG_FIELD_CHAIN_IS_REQUIRED)
  })
  slug : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(ChainError.SCANNER_ADDRESS_FIELD_CHAIN_IS_REQUIRED)
  })
  @IsNotEmpty({
    message : JSON.stringify(ChainError.SCANNER_ADDRESS_FIELD_CHAIN_IS_REQUIRED)
  })
  scannerAddress :string

  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(ChainError.SYMBOL_FIELD_CHAIN_IS_REQUIRED)
  })
  symbol : string

  @ApiProperty({
    default : true
  })
  @Allow()
  @IsBoolean({
    message : JSON.stringify(ChainError.STATUS_FIELD_CHAIN_IS_REQUIRED)
  })
  status :Boolean
}