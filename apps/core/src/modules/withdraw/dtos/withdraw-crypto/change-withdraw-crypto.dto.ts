import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankError, FeeWithdrawError, SpeedWithdrawError, WithdrawCryptoError } from '@elyasbr/tools-chain/dist/src';
import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';

export class ChangeWithdrawCryptoDto {


  @ApiProperty()
  @IsBoolean({
    message : JSON.stringify(WithdrawCryptoError.STATUS_FIELD_WITHDRAW_CRYPTO_IS_REQUIRED)
  })
  status :Boolean
}