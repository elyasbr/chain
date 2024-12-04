import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { CreateCryptoDto } from '../../dtos/crypto/create-crypto.dto';
import { UpdateCryptoDto } from '../../dtos/crypto/update-crypto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';

export class rewardToken {
  @ApiProperty()
  cryptoId:string

  @ApiProperty()
  amount :string
}
export class UpdateCryptoMongoMapper extends  Crypto{


  constructor( updateCryptoDto : UpdateCryptoDto ) {
    super();
    this.archId=updateCryptoDto.archId
    this.assetId=updateCryptoDto.assetId
    this.isWithdraw=updateCryptoDto.isWithdraw
    this.smartContractId = updateCryptoDto.smartContractId
    this.isDeposit=updateCryptoDto.isDeposit
    this.rewardToken={
      assetId : updateCryptoDto.rewardToken?.assetId,
      amount : updateCryptoDto.rewardToken?.amount
    }
    this.decimalBlockchain =updateCryptoDto.decimalBlockchain
    this.minInvest=updateCryptoDto.minInvest
    this.status= updateCryptoDto.status


  }
}