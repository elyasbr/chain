import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "country"})
export class Country extends AbstractDocument {

  @Prop()
  slug : string

  @Prop()
  iso2 : string

  @Prop()
  iso3? : string


  @Prop({
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const CountrySchema = SchemaFactory.createForClass( Country );