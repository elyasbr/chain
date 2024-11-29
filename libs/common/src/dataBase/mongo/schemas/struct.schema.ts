import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@elyasbr/dynamic-mongo/dist/src';



@Schema({ versionKey: false  ,
  timestamps : {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } , collection : "struct"})
export class Struct extends AbstractDocument {

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  slug : string

  @Prop()
  regex : string

  @Prop({
    type:String ,
    index : true ,
    unique : true
  })
  addressServer : string

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

export const StructSchema = SchemaFactory.createForClass( Struct );