import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterChain } from '../../../chain/dtos/filter-chain.dto';

 class FilterCountryBankRlCrypto {
  @ApiPropertyOptional( {
    default : undefined
  })
  slugBAnk : string
}
export class FilterCountryBankRlCryptoDto  extends FilterBaseSwaggerDto(FilterCountryBankRlCrypto ,{} ){
  constructor() {
    super();

  }
}