import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';


export class FilterIpg {

}
export class FilterIpgDto extends FilterBaseSwaggerDto(FilterIpg ,{} ){
  constructor() {
    super();

  }



}