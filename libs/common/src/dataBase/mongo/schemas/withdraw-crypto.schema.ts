import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, FieldsMongoEnum } from '@elyasbr/dynamic-mongo/dist/src';
import { UserWalletSchema } from '@app/common/dataBase/mongo/schemas/user-wallet.schema';



@Schema({ versionKey: false  ,
  timestamps : {
    createdAt: FieldsMongoEnum.CREATED_AT,
    updatedAt: FieldsMongoEnum.UPDATED_AT
  } , collection : "withdraw-crypto"})
export class WithdrawCrypto extends AbstractDocument {

  @Prop()
  speedWithdrawId : string

  @Prop()
  cryptoId : string

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

export const WithdrawCryptoSchema = SchemaFactory.createForClass( WithdrawCrypto );
WithdrawCryptoSchema.index({ speedWithdrawId: 1, cryptoId: 1 }, { unique: true });
