import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from '@elyasbr/dynamic-mongo/dist/src';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
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
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const ChainSchema = SchemaFactory.createForClass( Chain );