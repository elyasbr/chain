import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "country"})
export class Country extends AbstractDocument {

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  slug : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  iso2 : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  iso3 : string

  @Prop({
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const CountrySchema = SchemaFactory.createForClass( Country );
