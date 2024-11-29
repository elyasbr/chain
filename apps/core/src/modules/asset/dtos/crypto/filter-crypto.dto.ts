import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterAsset } from '../asset/filter-asset.dto';

export class FilterCrypto {
  @ApiPropertyOptional( {
    default : undefined
  })
  assetId : string
}
export class FilterCryptoDto extends FilterBaseSwaggerDto(FilterCrypto ,{} ){
  constructor() {
    super();

  }



}