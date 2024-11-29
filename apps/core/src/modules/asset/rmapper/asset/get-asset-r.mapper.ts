import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';

export class GetAssetRMapper {

  @ApiProperty()
  assetId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  symbol : string

  @ApiProperty()
  logo : string

  @ApiProperty()
  isDeposit : Boolean

  @ApiProperty()
  isWithDraw : Boolean

  @ApiProperty()
  startDeposit : Date

  @ApiProperty()
  startWithdraw : Date

  @ApiProperty()
  startTrade : Date

  @ApiProperty({
    enum : StatusAssetEnum ,
    default : StatusAssetEnum.ACTIVE
  })
  status : StatusAssetEnum

  @ApiProperty({
    enum : TypeAsset ,
    default :TypeAsset.CRYPTO
  })
  typeAsset : TypeAsset

  @ApiProperty()
  decimalShow : number

  @ApiProperty()
  decimalCalc : number

  @ApiProperty({
    type :Date ,
    default : (new Date()).toJSON()
  })
  created_at : Date
}