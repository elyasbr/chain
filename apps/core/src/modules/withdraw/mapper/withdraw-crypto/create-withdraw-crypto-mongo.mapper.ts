import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { CreateSpeedWithdrawDto } from '../../dtos/speed-withdraw/create-speed-withdraw.dto';
import { WithdrawCrypto } from '@app/common/dataBase/mongo/schemas/withdraw-crypto.schema';
import { CreateWithdrawCryptoDto } from '../../dtos/withdraw-crypto/create-withdraw-crypto.dto';


export class CreateWithdrawCryptoMongoMapper extends  WithdrawCrypto {


  constructor( createWithdrawCryptoDto : CreateWithdrawCryptoDto ) {
    super();
    this.speedWithdrawId = createWithdrawCryptoDto.speedWithdrawId
    this.cryptoId=createWithdrawCryptoDto.cryptoId
    this.rateWithdraw=createWithdrawCryptoDto.rateWithdraw
    this.status=createWithdrawCryptoDto.status
  }
}