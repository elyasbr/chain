import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { Prop } from '@nestjs/mongoose';
import { Allow, IsBoolean, IsDate, IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';
import { AssetError } from '@elyasbr/tools-chain/dist/src';

export class UpdateAssetDto {
  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(AssetError.SLUG_FIELD_ASSET_IS_REQUIRED)
  })
  slug : string

  @ApiProperty({
    enum : TypeAsset ,
    default : TypeAsset.CRYPTO
  })
  @Allow()
  @IsEnum(TypeAsset , {
    message : JSON.stringify(AssetError.TYPE_ASSET_FIELD_ASSET_IS_REQUIRED)
  })
  typeAsset : TypeAsset

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(AssetError.SYMBOL_FIELD_ASSET_IS_REQUIRED)
  })
  symbol : string

  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(AssetError.IS_WITHDRAW_FIELD_ASSET_IS_REQUIRED)
  })
  isWithdraw : boolean

  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(AssetError.IS_WITHDRAW_FIELD_ASSET_IS_REQUIRED)
  })
  isDeposit : boolean

  @ApiProperty({
    example : (new Date(Date.now())).toJSON()
  })
  @Allow()
  @IsDate({
    message : JSON.stringify(AssetError.START_DEPOSIT_FIELD_ASSET_IS_REQUIRED)
  })
  startDeposit : Date

  @ApiProperty({
    example : (new Date(Date.now())).toJSON()
  })
  @Allow()
  @IsDate({
    message : JSON.stringify(AssetError.START_WITHDRAW_FIELD_ASSET_IS_REQUIRED)
  })
  startWithdraw? : Date

  @ApiProperty({
    example : (new Date(Date.now())).toJSON()
  })
  @Allow()
  @IsDate({
    message : JSON.stringify(AssetError.START_TRADE_FIELD_ASSET_IS_REQUIRED)
  })
  startTrade : Date

  @ApiPropertyOptional()
  @Allow()
  @IsNumber({} ,{
    message : JSON.stringify(AssetError.DECIMAL_SHOW_FIELD_ASSET_IS_REQUIRED)
  })
  decimalShow : number

  @ApiPropertyOptional()
  @Allow()
  @IsNumber({} ,{
    message : JSON.stringify(AssetError.DECIMAL_CALC_FIELD_ASSET_IS_REQUIRED)
  })
  decimalCalc : number


  @ApiPropertyOptional()
  @Allow()
  @IsUrl({} ,{
    message : JSON.stringify(AssetError.LOGO_FIELD_ASSET_IS_REQUIRED)
  })
  logo : string

  @ApiProperty({
    enum : StatusAssetEnum ,
    default : StatusAssetEnum.ACTIVE
  })
  @Allow()
  @IsEnum(StatusAssetEnum ,{
    message : JSON.stringify(AssetError.STATUS_FIELD_ASSET_IS_REQUIRED)
  })
  status :StatusAssetEnum
}