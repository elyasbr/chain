import { CreateStructDto } from '../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../chain/dtos/create-chain.dto';
import { UpdateChainDto } from '../../chain/dtos/update-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { UpdateArchDto } from '../arch/update-arch.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateArchMongoMapper extends  Arch{

  constructor( updateArchDto : UpdateArchDto ) {
    super();
    this.chainId=updateArchDto.chainId
    this.rateWithdraw=updateArchDto.rateWithdraw

    this.slug=updateArchDto.slug
    this.description=updateArchDto.description
    this.symbol=updateArchDto.symbol
    this.status=updateArchDto.status
  }
}