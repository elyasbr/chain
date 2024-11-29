import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterAsset } from '../../../asset/dtos/asset/filter-asset.dto';

export class FilterBank {
  @ApiPropertyOptional( {
    default : undefined
  })
  slugBank : string
}
export class FilterBankDto extends FilterBaseSwaggerDto(FilterBank ,{} ){
  constructor() {
    super();

  }



}