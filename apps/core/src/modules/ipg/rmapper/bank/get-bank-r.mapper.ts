import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';

export class GetBankRMapper {

  @ApiProperty()
  bankId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  symbol : string

  @ApiProperty()
  iconFileId : string

  @ApiProperty()
  status : Boolean

  @ApiProperty({
    default : (new Date()).toJSON()
  })
  created_at : Date

}