
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import { CreateCountryBankDto } from '../../dtos/country/create-country-bank.dto';
import { CountryBankRlCrypto } from '@app/common/dataBase/mongo/schemas/country-bank-rl-crypto.schema';
import { CreateCountryBankRlCryptoDto } from '../../dtos/country/create-country-bank-rl-crypto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';

export class rewardToken {
  @ApiProperty()
  cryptoId:string

  @ApiProperty()
  amount :string
}
export class CreateCountryBankCryptoMongoMapper extends  CountryBankRlCrypto{
  @ApiProperty()
  id : string

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
  constructor( createCountryBankRlCryptoDto : CreateCountryBankRlCryptoDto ) {
    super();
    this.countryBankId = createCountryBankRlCryptoDto.countryBankId
    this.cryptoId=createCountryBankRlCryptoDto.cryptoId

  }
}