
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import { CreateCountryBankDto } from '../../dtos/country/create-country-bank.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCountryBankMongoMapper extends  CountryRlBank{
  @ApiProperty()
  id : string

  @ApiProperty()
  countryId : string

  @ApiProperty()
  bankId : string

  @ApiProperty({
    default : (new Date()).toJSON()
  })
  created_at : Date



  constructor( createCountryBankDto : CreateCountryBankDto ) {
    super();
    this.countryId = createCountryBankDto.countryId
    this.bankId=createCountryBankDto.bankId

  }
}