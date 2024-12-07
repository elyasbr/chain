import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
export class PaginateCryptoRMapper {

  @ApiProperty()
  cryptoId: string

  @ApiProperty()
  assetId: string

  @ApiProperty()
  assetName: string

  @ApiProperty()
  assetSymbol : string

  @ApiProperty()
  isWithdraw: Boolean

  @ApiProperty()
  isDeposit: Boolean

  @ApiProperty()
  smartContractId: string

  @ApiProperty()
  rateWithdraw : number

  @ApiProperty()
  decimalBlockchain: number

  @ApiProperty()
  minInvest: number

  @ApiProperty({
    enum: StatusAssetEnum,
    default: StatusAssetEnum.ACTIVE
  })
  status: StatusAssetEnum

  @ApiProperty({
    type: Date
  })
  created_at: Date

  constructor(asset :Asset , crypto :Crypto ) {
    this.cryptoId =crypto['_id'].toString()
    this.assetId = asset['_id'].toString()
    this.assetName  = asset.slug
    this.assetSymbol = asset.symbol
    this.smartContractId =crypto.smartContractId
    this.decimalBlockchain = crypto.decimalBlockchain
    this.isDeposit=crypto.isDeposit
    this.isWithdraw = crypto.isWithdraw
    this.minInvest = crypto.minInvest
    this.rateWithdraw =crypto.minInvest
    this.rateWithdraw = crypto.rateWithdraw
    this.status = crypto.status
    this.created_at = crypto[FieldsMongoEnum.CREATED_AT]
  }

}