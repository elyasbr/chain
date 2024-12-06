import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterIpg } from '../../ipg/dtos/ipg/filter-ipg.dto';

export class FilterArchOfChain {

}
export class FilterArchOfChainDto  extends FilterBaseSwaggerDto(FilterArchOfChain ,{} ){
  constructor() {
    super();

  }



}