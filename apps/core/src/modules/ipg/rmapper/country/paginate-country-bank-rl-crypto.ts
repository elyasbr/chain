
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import { CreateCountryBankDto } from '../../dtos/country/create-country-bank.dto';
import { CountryBankRlCrypto } from '@app/common/dataBase/mongo/schemas/country-bank-rl-crypto.schema';
import { CreateCountryBankRlCryptoDto } from '../../dtos/country/create-country-bank-rl-crypto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';

export class rewardToken {
  @ApiProperty()
  assetId:string

  @ApiProperty()
  amount :string
}
export class PaginateCountryBankRlCrypto {
  @ApiProperty()
  countryBankCryptoId : string

  @ApiProperty()
  countryBankId : string

  @ApiProperty()
  cryptoId : string

  @ApiProperty()
  slugArch : string

  @ApiProperty()
  slugAsset : string

  @ApiProperty()
  isWithdraw : Boolean

  @ApiProperty()
  isDeposit : Boolean

  @ApiProperty()
  smartContractId : string

  @ApiProperty()
  rewardToken : rewardToken

  @ApiProperty()
  decimalBlockchain : number

  @ApiProperty()
  minInvest : number

  @ApiProperty({
    enum :StatusAssetEnum ,
    default : StatusAssetEnum.ACTIVE
  })
  status : StatusAssetEnum

  @ApiProperty({
    type : Date
  })
  created_at: Date

  constructor(arch :Arch , asset:Asset , crypto :Crypto, countryBankRlCrypto : CountryBankRlCrypto) {
    this.countryBankCryptoId = countryBankRlCrypto['_id'].toString()
    this.countryBankId = countryBankRlCrypto.countryBankId
    this.cryptoId = countryBankRlCrypto.cryptoId
    this.slugArch = arch.slug
    this.slugAsset =asset.slug
    this.isWithdraw = asset.isWithdraw
    this.isDeposit = crypto.isDeposit
    this.smartContractId = crypto.smartContractId
    this.decimalBlockchain =crypto.decimalBlockchain
    this.minInvest = crypto.minInvest
    this.status = crypto.status
    this.created_at = countryBankRlCrypto[FieldsMongoEnum.CREATED_AT]
  }

}