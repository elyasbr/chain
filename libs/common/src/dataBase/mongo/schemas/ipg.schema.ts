import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { MethodsEnum } from '@elyasbr/public/dist/src';


@Schema()
class LinkBackend {
  @Prop({
    type : String ,
    unique : true ,
    index : true
  })  url : string

  @Prop()
  body : string[]

  @Prop({
    type: String,
    enum : MethodsEnum ,
    default:  MethodsEnum.POST
  })
  method : MethodsEnum
}

@Schema()
class CallBackBackend {
  @Prop({
    type : String ,
    unique : true ,
    index : true
  })
  url : string

  @Prop()
  body : string[]

  @Prop({
    type: String,
    enum : MethodsEnum ,
    default:  MethodsEnum.POST
  })
  method : MethodsEnum
}

@Schema({ versionKey: false ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } , collection : "ipg"})
export class Ipg extends AbstractDocument {

  @Prop({
    lowercase: true ,
    type : String ,
    index : true ,
    unique : true

  })
  slug : string

  @Prop()
  linkBackend : LinkBackend

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  frontLink : string

  @Prop()
  callBackBackend : CallBackBackend

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
