import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';



@Schema({ versionKey: false  ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } , collection : "struct"})
export class Struct extends AbstractDocument {

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
  symbol : string

  @Prop()
  regex : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  httpServer : string

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  microserviceServer : string

  @Prop()
  description? : string




  @Prop({
    type : Boolean ,
    default: true
  })
  status? : Boolean

}

export const StructSchema = SchemaFactory.createForClass( Struct );