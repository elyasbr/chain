import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "group-currency"})
export class GroupCurrency extends AbstractDocument {

  @Prop()
  slug : string

  @Prop()
  symbol : string

  @Prop({
    default: true
  })
  status : Boolean

}

export const GroupCurrencySchema = SchemaFactory.createForClass( GroupCurrency );