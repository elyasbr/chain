import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "bank"})
export class Bank extends AbstractDocument {

  @Prop({
    type : String ,
    index : true ,
    unique :true
  })
  slug : string

  @Prop()
  iconFileId : string

  @Prop({
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const BankSchema = SchemaFactory.createForClass( Bank );