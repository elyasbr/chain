import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../../chain/dtos/create-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { CreateArchDto } from '../../../arch/arch/create-arch.dto';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { CreateAssetDto } from '../../dtos/asset/create-asset.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { RewardDeposit } from '@app/common/dataBase/mongo/schemas/reward-deposit.schema';
import { CreateRewardDepositDto } from '../../dtos/reward-deposit/create-reward-deposit.dto';


export class CreateRewardDepositMongoMapper extends  RewardDeposit{


  constructor( createRewardDepositDto : CreateRewardDepositDto ) {
    super();
    this.cryptoId=createRewardDepositDto.cryptoId
    this.assetId=createRewardDepositDto.assetId
    this.amount = createRewardDepositDto.amount
    this.status = createRewardDepositDto.status

  }
}