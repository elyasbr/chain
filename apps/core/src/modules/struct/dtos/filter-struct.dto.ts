import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterIpg } from '../../ipg/dtos/ipg/filter-ipg.dto';

export class FilterStruct {

}
export class FilterStructDto  extends FilterBaseSwaggerDto(FilterStruct ,{} ){
  constructor() {
    super();

  }



}