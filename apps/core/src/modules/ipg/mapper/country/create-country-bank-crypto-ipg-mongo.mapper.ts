
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import { CreateCountryBankDto } from '../../dtos/country/create-country-bank.dto';
import { CountryBankRlCrypto } from '@app/common/dataBase/mongo/schemas/country-bank-rl-crypto.schema';
import { CreateCountryBankRlCryptoDto } from '../../dtos/country/create-country-bank-rl-crypto.dto';
import { CountryBankCryptoRlIpg } from '@app/common/dataBase/mongo/schemas/country-bank-crypto-rl-ipg.schema';
import { CreateCountryBankCryptoRlIpgDto } from '../../dtos/country/create-country-bank-crypto-rl-ipg.dto';


export class CreateCountryBankCryptoIpgMongoMapper extends  CountryBankCryptoRlIpg{

  constructor( createCountryBankCryptoRlIpgDto : CreateCountryBankCryptoRlIpgDto ) {
    super();
    this.countryBankCryptoId = createCountryBankCryptoRlIpgDto.countryBankCryptoId
    this.ipgId=createCountryBankCryptoRlIpgDto.ipgId

  }
}