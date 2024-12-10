import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../../chain/dtos/create-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { CreateArchDto } from '../../../arch/dtos/create-arch.dto';
import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { CreateAssetDto } from '../../dtos/asset/create-asset.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TypeAsset } from '@app/common/enums/type-asset.enum';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';


export class CreateAssetMongoMapper extends  Asset{


  constructor( createAssetDto : CreateAssetDto ) {
    super();
    this.slug=createAssetDto.slug
    this.symbol = createAssetDto.symbol
    this.groupCurrency=createAssetDto.groupCurrency
    this.rateWithdarw = createAssetDto.rateWithdarw
    this.rateTrade = createAssetDto.rateTrade
    this.isStableCoin = createAssetDto.isStableCoin
    this.logo=createAssetDto.logo
    this.isDeposit = createAssetDto.isDeposit
    this.isWithdraw=createAssetDto.isWithdraw
    this.startDeposit=createAssetDto.startDeposit
    this.startWithdraw=createAssetDto.startWithdraw
    this.startTrade=createAssetDto.startTrade
    this.status=createAssetDto.status
    this.typeAsset=createAssetDto.typeAsset
    this.decimalShow=createAssetDto.decimalShow
    this.decimalCalc=createAssetDto.decimalCalc
  }
}