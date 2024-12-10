import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
export class FilterWithdrawCrypto {

}
export class FilterWithdrawCryptoDto extends FilterBaseSwaggerDto(FilterWithdrawCrypto ,{} ){
  constructor() {
    super();

  }



}