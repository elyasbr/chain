import { Prop } from '@nestjs/mongoose';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsBoolean, IsEnum, IsMongoId, IsNumber, IsObject, IsString } from 'class-validator';
import { ArchError, AssetError, CryptoError } from '@elyasbr/tools-chain/dist/src';



export class CreateCryptoDto {
  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(ArchError.PATTERN_ARCH_ID_IS_WRONG)
  })
  archId : string

  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(AssetError.PATTERN_ASSET_ID_IS_WRONG)
  })
  assetId : string

  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(CryptoError.IS_WITHDRAW_FIELD_CRYPTO_IS_REQUIRED)
  })
  isWithdraw : Boolean

  @ApiProperty({
    default : false ,
    example : false
  })
  @Allow()
  @IsBoolean({
    message : JSON.stringify(CryptoError.IS_DEPOSIT_FIELD_CRYPTO_IS_REQUIRED)
  })
  isDeposit : Boolean

  @ApiProperty({
    default : 1
  })
  @Allow()
  @IsNumber({} ,{
    message : JSON.stringify(CryptoError.RATE_WITHDRAW_FIELD_CRYPTO_IS_REQUIRED)
  })
  rateWithdraw : number

  @ApiProperty()
  @Allow()
  @IsNumber({} ,{
    message : JSON.stringify(CryptoError.DECIMAL_BLOCK_CHAIN_FIELD_CRYPTO_IS_REQUIRED)
  })
  decimalBlockchain : number

  @ApiProperty()
  @Allow()
  @IsNumber({} ,{
    message : JSON.stringify(CryptoError.MIN_INVEST_CHAIN_FIELD_CRYPTO_IS_REQUIRED)
  })
  minInvest : number

  @ApiPropertyOptional()
  @Allow()
  smartContractId? : string

  @ApiProperty({
    enum : StatusAssetEnum ,
    default: StatusAssetEnum.ACTIVE
  })
  @Allow()
  @IsEnum(StatusAssetEnum ,{
    message : JSON.stringify(AssetError.STATUS_FIELD_ASSET_IS_REQUIRED)
  })
  status : StatusAssetEnum
}