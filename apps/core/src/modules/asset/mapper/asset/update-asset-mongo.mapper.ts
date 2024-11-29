import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Asset } from '@app/common/dataBase/mongo/schemas/asset.schema';
import { UpdateAssetDto } from '../../dtos/asset/update-asset.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusAssetEnum } from '@app/common/enums/status-asset.enum';
import { TypeAsset } from '@app/common/enums/type-asset.enum';


export class UpdateAssetMongoMapper extends  Asset{

  constructor( updateAssetDto : UpdateAssetDto ) {
    super();
    this.slug=updateAssetDto.slug
    this.symbol = updateAssetDto.symbol
    this.logo=updateAssetDto.logo
    this.isDeposit = updateAssetDto.isDeposit
    this.isWithdraw=updateAssetDto.isWithdraw
    this.startDeposit=updateAssetDto.startDeposit
    this.startWithdraw=updateAssetDto.startWithdraw
    this.startTrade=updateAssetDto.startTrade
    this.status=updateAssetDto.status
    this.typeAsset=updateAssetDto.typeAsset
    this.decimalShow=updateAssetDto.decimalShow
    this.decimalCalc=updateAssetDto.decimalCalc
  }
}