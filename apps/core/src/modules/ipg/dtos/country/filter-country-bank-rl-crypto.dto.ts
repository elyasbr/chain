import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterChain } from '../../../chain/dtos/filter-chain.dto';

 class FilterCountryBankRlCrypto {

}
export class FilterCountryBankRlCryptoDto  extends FilterBaseSwaggerDto(FilterCountryBankRlCrypto ,{} ){
  constructor() {
    super();

  }
}