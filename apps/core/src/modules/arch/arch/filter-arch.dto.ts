import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterChain } from '../../chain/dtos/filter-chain.dto';

export class FilterArch {

}
export class FilterArchDto  extends FilterBaseSwaggerDto(FilterArch ,{} ){
  constructor() {
    super();

  }
}