import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { Expression } from 'mongoose';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "arch"})
export class Arch extends AbstractDocument {

  @Prop({
  })
  chainId : string

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

  @Prop()
  rateWithdraw : number

  @Prop({
    default: true
  })
  status : Boolean

}

export const ArchSchema = SchemaFactory.createForClass( Arch );