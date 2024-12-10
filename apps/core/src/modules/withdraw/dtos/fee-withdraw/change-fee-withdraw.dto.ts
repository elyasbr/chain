import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankError, FeeWithdrawError, SpeedWithdrawError } from '@elyasbr/tools-chain/dist/src';
import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';

export class ChangeFeeWithdrawDto {


  @ApiProperty()
  @IsBoolean({
    message : JSON.stringify(FeeWithdrawError.STATUS_FIELD_FEE_WITHDRAW_IS_REQUIRED)
  })
  status :Boolean
}