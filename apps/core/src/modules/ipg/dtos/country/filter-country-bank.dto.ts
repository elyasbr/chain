import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterChain } from '../../../chain/dtos/filter-chain.dto';

export class FilterBank {

}
export class FilterCountryBankDto  extends FilterBaseSwaggerDto(FilterBank ,{} ){
  constructor() {
    super();

  }
}