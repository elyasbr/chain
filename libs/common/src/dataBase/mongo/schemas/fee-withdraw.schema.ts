import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';



@Schema({ versionKey: false  ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT ,
  } , collection : "fee-withdraw"})
export class FeeWithdraw extends AbstractDocument {

  @Prop()
  withdrawCryptoId : string

  @Prop()
  feeWithdraw : number

  @Prop({
    type : Boolean ,
    default: true
  })
  status : Boolean

}

export const FeeWithdrawSchema = SchemaFactory.createForClass( FeeWithdraw );