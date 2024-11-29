import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterChain } from '../../../chain/dtos/filter-chain.dto';

 class FilterCountryBankCryptoRlIpg {
  @ApiPropertyOptional( {
    default : undefined
  })
  slugIpg : string
}
export class FilterCountryBankCryptoRlIpgDto  extends FilterBaseSwaggerDto(FilterCountryBankCryptoRlIpg ,{} ){
  constructor() {
    super();

  }
}