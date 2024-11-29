import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterIpg } from '../../../ipg/dtos/ipg/filter-ipg.dto';

export class FilterAsset {
  @ApiPropertyOptional( {
    default : undefined
  })
  slug : string
}
export class FilterAssetDto extends FilterBaseSwaggerDto(FilterAsset ,{} ){
  constructor() {
    super();

  }



}