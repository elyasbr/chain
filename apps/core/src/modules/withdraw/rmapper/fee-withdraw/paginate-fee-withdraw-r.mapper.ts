
import { ApiProperty } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { SpeedWithdrawError } from '@elyasbr/tools-chain/dist/src';


export class PaginateFeeWithdrawRMapper  {
  @ApiProperty()
  withdrawCryptoId : string

  @ApiProperty()
  feeWithdrawId : string


  @ApiProperty()
  feeWithdraw : number


  @ApiProperty()
  status :Boolean

  @ApiProperty({
    default: (new Date()).toJSON()
  })
  created_at : Date


}