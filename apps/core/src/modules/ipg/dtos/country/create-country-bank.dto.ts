import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsMongoId } from 'class-validator';
import { BankError, CountryError } from '@elyasbr/tools-chain/dist/src';

export class CreateCountryBankDto {
  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify( CountryError.PATTERN_COUNTRY_ID_IS_WRONG)
  })
  countryId : string

  @ApiPropertyOptional()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(BankError.PATTERN_BANK_ID_IS_WRONG)
  })
  bankId : string
}