import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';
import { FilterIpg } from '../../../ipg/dtos/ipg/filter-ipg.dto';

export class FilterRewardDeposit {

}
export class FilterRewardDepositDto extends FilterBaseSwaggerDto(FilterRewardDeposit ,{} ){
  constructor() {
    super();

  }



}