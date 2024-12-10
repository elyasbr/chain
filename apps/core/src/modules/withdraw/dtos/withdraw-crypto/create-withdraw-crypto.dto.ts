import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankError, SpeedWithdrawError, WithdrawCryptoError } from '@elyasbr/tools-chain/dist/src';
import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { WithdrawCrypto } from '@app/common/dataBase/mongo/schemas/withdraw-crypto.schema';

export class CreateWithdrawCryptoDto {
  @ApiProperty()
  @IsMongoId({
     message : JSON.stringify(WithdrawCryptoError.PATTERN_SPEED_WITHDRAW_ID_IS_WRONG)
  })
  speedWithdrawId : string

  @ApiProperty()
  @IsMongoId({
    message : JSON.stringify(WithdrawCryptoError.PATTERN_CRYPTO_ID_IS_WRONG)
  })
  cryptoId : string


  @ApiProperty({
    default : 0
  })
  @Allow()
  @IsNumber({} ,{
   message : JSON.stringify(WithdrawCryptoError.RATE_WITHDRAW_FIELD_WITHDRAW_CRYPTO_IS_REQUIRED)
  })
  rateWithdraw : number

  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(WithdrawCryptoError. STATUS_FIELD_WITHDRAW_CRYPTO_IS_REQUIRED)
  })
  status :Boolean
}