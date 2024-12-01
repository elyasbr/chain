
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import { CreateCountryBankDto } from '../../dtos/country/create-country-bank.dto';
import { CountryBankRlCrypto } from '@app/common/dataBase/mongo/schemas/country-bank-rl-crypto.schema';
import { CreateCountryBankRlCryptoDto } from '../../dtos/country/create-country-bank-rl-crypto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { CountryBankCryptoRlIpg } from '@app/common/dataBase/mongo/schemas/country-bank-crypto-rl-ipg.schema';


export class PaginateCountryBankCryptoRlIpgRMapper {
  @ApiProperty()
  countryBankCryptoId : string

  @ApiProperty()
  ipgId : string

  @ApiProperty()
  slugIpg : string

  @ApiProperty()
  link : string

  @ApiProperty()
  frontLink : string

  @ApiProperty()
  callBack : string

  @ApiProperty()
  frontCallBack : string

  @ApiProperty({
    enum : TypeIpgEnum ,
    default :TypeIpgEnum.CRYPTO
  })
  typeIpg : TypeIpgEnum

  @ApiProperty()
  status : Boolean

  @ApiProperty({
    type : Date
  })
  created_at: Date

  constructor(ipg :Ipg , countryBankCryptoIpg : CountryBankCryptoRlIpg) {
    this.countryBankCryptoId = countryBankCryptoIpg.countryBankCryptoId
    this.ipgId = ipg['id'].toString()
    this.slugIpg = ipg.slug
    this.typeIpg = ipg.typeIpg
    this.link = ipg.link
    this.frontLink = ipg.frontLink
    this.callBack = ipg.callBack
    this.frontCallBack = ipg.frontCallBack
    this.status = ipg.status
    this.created_at = countryBankCryptoIpg[FieldsMongoEnum.CREATED_AT]
  }



}