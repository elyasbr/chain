import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterIpg } from '../../ipg/dtos/ipg/filter-ipg.dto';

export class FilterChainsOfStruct {
  @ApiProperty( {
    default : undefined
  })
  name : string
}
export class FilterChainsOfStructDto  extends FilterBaseSwaggerDto(FilterChainsOfStruct ,{} ){
  constructor() {
    super();

  }



}