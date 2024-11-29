import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { CountryRlBank } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';
import { Bank } from '@app/common/dataBase/mongo/schemas/bank.schema';
import { FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';

export class PaginateCountryBankRMapper {

  @ApiProperty()
  countryId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  iconFileId : string

  @ApiProperty()
  status : Boolean

  @ApiProperty({
    default : (new Date()).toJSON()
  })
  created_at : Date

  constructor(countryRlBank : CountryRlBank , bank :Bank) {
    this.countryId = countryRlBank.countryId
    this.slug = bank.slug
    this.iconFileId = bank.iconFileId
    this.status = bank.status
    this.created_at = countryRlBank[FieldsMongoEnum.CREATED_AT]

  }


}