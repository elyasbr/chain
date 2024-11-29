import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { CountryRlBankSchema } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "country_bank_crypto_rl_ipg"})
export class CountryBankCryptoRlIpg extends AbstractDocument {

  @Prop()
  countryBankCryptoId : string

  @Prop()
  ipgId : string


}

export const CountryBankCryptoRlIpgSchema = SchemaFactory.createForClass( CountryBankCryptoRlIpg );
CountryBankCryptoRlIpgSchema.index({ countryBankCryptoId: 1, ipgId: 1 }, { unique: true });
