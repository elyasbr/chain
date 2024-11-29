import { Prop } from '@nestjs/mongoose';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsMongoId } from 'class-validator';
import { CountryError, IpgError } from '@elyasbr/tools-chain/dist/src';



export class CreateCountryBankCryptoRlIpgDto {
  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(CountryError.PATTERN_COUNTRY_BANK_CRYPTO_ID_IS_WRONG)
  })
  countryBankCryptoId : string

  @ApiProperty()
  @Allow()
  @IsMongoId({
    message : JSON.stringify(IpgError.PATTERN_IPG_ID_IS_WRONG)
  })
  ipgId : string




}