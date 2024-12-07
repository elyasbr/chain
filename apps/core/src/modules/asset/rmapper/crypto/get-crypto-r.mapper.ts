import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';

export class GetCryptoRMapper {

  @ApiProperty()
  cryptoId: string

  @ApiProperty()
  archId: string

  @ApiProperty()
  assetId: string

  @ApiProperty()
  isWithdraw: Boolean

  @ApiProperty()
  isDeposit: Boolean

  @ApiProperty()
  smartContractId: string

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
}