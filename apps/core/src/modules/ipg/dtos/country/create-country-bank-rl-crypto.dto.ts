import { Prop } from '@nestjs/mongoose';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsMongoId } from 'class-validator';
import { CountryError, CryptoError } from '@elyasbr/tools-chain/dist/src';



export class CreateCountryBankRlCryptoDto {
  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(CountryError.PATTERN_COUNTRY_BANK_ID_IS_WRONG)
  })

  countryBankId : string

  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(CryptoError.PATTERN_CRYPTO_ID_IS_WRONG)
  })
  cryptoId : string




}