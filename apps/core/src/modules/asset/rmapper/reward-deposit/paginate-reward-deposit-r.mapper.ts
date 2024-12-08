import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { RewardDeposit } from '@app/common/dataBase/mongo/schemas/reward-deposit.schema';

export class PaginateRewardDepositRMapper {

  @ApiProperty()
  cryptoId: string

  @ApiProperty()
  assetId: string

  @ApiProperty()
  slug: string

  @ApiProperty()
  symbol: string


  @ApiProperty()
  status: Boolean

  @ApiProperty({
    type: Date
  })
  created_at: Date
  constructor(rewardDeposit : RewardDeposit ,crypto: Crypto , asset :Asset ) {
    this.cryptoId = crypto['_id'].toString()
    this.assetId = asset['_id'].toString()
    this.slug = asset.slug
    this.symbol = asset.symbol
    this.status = rewardDeposit.status
    this.created_at = rewardDeposit['created_at']

  }
}