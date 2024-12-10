import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
export class FilterFeeWithdraw {

}
export class FilterFeeWithdrawDto extends FilterBaseSwaggerDto(FilterFeeWithdraw ,{} ){
  constructor() {
    super();

  }



}