import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import {  Types } from 'mongoose';


@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } ,  collection : "ipg"})
export class Ipg extends AbstractDocument {

  @Prop({
    lowercase: true
  })
  slug : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  link : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  frontLink? : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  callBack : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  frontCallBack? : string

  @Prop({
    enum : TypeIpgEnum ,
    default :TypeIpgEnum.CRYPTO
  })
  typeIpg : TypeIpgEnum

  @Prop({
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const IpgSchema = SchemaFactory.createForClass( Ipg );
