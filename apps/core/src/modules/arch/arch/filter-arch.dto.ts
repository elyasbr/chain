import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterChain } from '../../chain/dtos/filter-chain.dto';

export class FilterArch {
  @ApiPropertyOptional( {
    default : undefined
  })
  name : string
}
export class FilterArchDto  extends FilterBaseSwaggerDto(FilterArch ,{} ){
  constructor() {
    super();

  }
}