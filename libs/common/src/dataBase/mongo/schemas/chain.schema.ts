import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "chain"})
export class Chain extends AbstractDocument {

  @Prop()
  structId : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  slug : string

  @Prop()
  description? : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  symbol : string

  @Prop({
  })
  scannerAddress : string

  @Prop({
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const ChainSchema = SchemaFactory.createForClass( Chain );