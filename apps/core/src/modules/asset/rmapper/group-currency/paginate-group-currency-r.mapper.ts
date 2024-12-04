import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
export class PaginateGroupCurrencyRMapper {

  @ApiProperty()
  groupCurrencyId: string

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
}