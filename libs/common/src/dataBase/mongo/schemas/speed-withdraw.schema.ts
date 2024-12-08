import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';



@Schema({ versionKey: false  ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } , collection : "speed-withdraw"})
export class SpeedWithdraw extends AbstractDocument {

  @Prop({
    type : String ,
    index : true ,
    unique : true
  })
  slug : string

  @Prop()
  description : string

  @Prop({
    default : 0
  })
  rateWithdraw : number

  @Prop({
    type : Boolean ,
    default: true
  })
  status : Boolean

}

export const SpeedWithdrawSchema = SchemaFactory.createForClass( SpeedWithdraw );