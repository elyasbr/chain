import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';

export class GetCountryRMapper {

  @ApiProperty()
  countryId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  iso2 : string

  @ApiProperty()
  iso3 : string

  @ApiProperty()
  status : Boolean

  @ApiProperty({
    default : (new Date()).toJSON()
  })
  created_at : Date

}