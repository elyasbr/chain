import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "country_rl_bank"})
export class CountryRlBank extends AbstractDocument {

  @Prop()
  countryId : string

  @Prop()
  bankId : string
}

export const CountryRlBankSchema = SchemaFactory.createForClass( CountryRlBank );
CountryRlBankSchema.index({ countryId: 1, bankId: 1 }, { unique: true });
