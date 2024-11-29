import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "arch"})
export class Arch extends AbstractDocument {

  @Prop()
  chainId : string

  @Prop()
  slug : string

  @Prop()
  description? : string

  @Prop()
  symbol : string

  @Prop()
  rateWithdraw : number

  @Prop({
    default: true
  })
  status : Boolean

}

export const ArchSchema = SchemaFactory.createForClass( Arch );