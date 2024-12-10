import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { CreateSpeedWithdrawDto } from '../../dtos/speed-withdraw/create-speed-withdraw.dto';
import { WithdrawCrypto } from '@app/common/dataBase/mongo/schemas/withdraw-crypto.schema';
import { CreateWithdrawCryptoDto } from '../../dtos/withdraw-crypto/create-withdraw-crypto.dto';
import { FeeWithdraw } from '@app/common/dataBase/mongo/schemas/fee-withdraw.schema';
import { CreateFeeWithdrawDto } from '../../dtos/fee-withdraw/create-fee-withdraw.dto';


export class CreateFeeWithdrawMongoMapper extends  FeeWithdraw {


  constructor( createFeeWithdrawDto : CreateFeeWithdrawDto ) {
    super();
    this.withdrawCryptoId = createFeeWithdrawDto.withdrawCryptoId
    this.feeWithdraw=createFeeWithdrawDto.feeWithdraw
    this.status=createFeeWithdrawDto.status
  }
}