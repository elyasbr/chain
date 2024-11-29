import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsString } from 'class-validator';
import { CountryError } from '@elyasbr/tools-chain/dist/src';

export class CreateCountryDto {
  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(CountryError.SLUG_FIELD_COUNTRY_IS_REQUIRED)
  })
  slug : string

  @ApiPropertyOptional()
  @Allow()
  @IsString({
    message : JSON.stringify(CountryError.ISO2_FIELD_COUNTRY_IS_REQUIRED)
  })
  iso2 : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(CountryError.ISO3_FIELD_COUNTRY_IS_REQUIRED)
  })
  iso3 : string


  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(CountryError.STATUS_FIELD_COUNTRY_IS_REQUIRED)
  })
  status :Boolean
}