import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { CountryRlBankSchema } from '@app/common/dataBase/mongo/schemas/country-rl-bank.schema';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "country_bank_rl_crypto"})
export class CountryBankRlCrypto extends AbstractDocument {

  @Prop()
  countryBankId : string

  @Prop()
  cryptoId : string



}

export const CountryBankRlCryptoSchema = SchemaFactory.createForClass( CountryBankRlCrypto );
CountryBankRlCryptoSchema.index({ countryBankId: 1, cryptoId: 1 }, { unique: true });
