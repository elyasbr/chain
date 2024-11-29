import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { FilterBaseSwaggerDto } from '@elyasbr/public/dist/src';


export class FilterIpg {
  @ApiProperty( )
  name : string
}
export class FilterIpgDto extends FilterBaseSwaggerDto(FilterIpg ,{} ){
  constructor() {
    super();

  }



}