import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Crypto } from '@app/common/dataBase/mongo/schemas/crypto.schema';
import { CreateCryptoDto } from '../../dtos/crypto/create-crypto.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';


export class CreateCryptoMongoMapper extends  Crypto{

  constructor( createCryptoDto : CreateCryptoDto ) {
    super();
    this.archId=createCryptoDto.archId
    this.assetId=createCryptoDto.assetId
    this.isWithdraw=createCryptoDto.isWithdraw
    this.isDeposit=createCryptoDto.isDeposit
    this.smartContractId = createCryptoDto.smartContractId
    this.decimalBlockchain =createCryptoDto.decimalBlockchain
    this.minInvest=createCryptoDto.minInvest
    this.status= createCryptoDto.status


  }
}