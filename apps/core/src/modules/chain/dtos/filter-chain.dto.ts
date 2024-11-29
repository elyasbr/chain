import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterStruct } from '../../struct/dtos/filter-struct.dto';

export class FilterChain {
  @ApiPropertyOptional( {
    default : undefined
  })
  name : string
}
export class FilterChainDto  extends FilterBaseSwaggerDto(FilterChain ,{} ){
  constructor() {
    super();

  }
}
