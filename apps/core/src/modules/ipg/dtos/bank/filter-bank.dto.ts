import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterAsset } from '../../../asset/dtos/asset/filter-asset.dto';

export class FilterBank {

}
export class FilterBankDto extends FilterBaseSwaggerDto(FilterBank ,{} ){
  constructor() {
    super();

  }



}