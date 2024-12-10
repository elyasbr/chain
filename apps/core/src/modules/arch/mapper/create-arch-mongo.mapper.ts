import { CreateStructDto } from '../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../chain/dtos/create-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { CreateArchDto } from '../dtos/create-arch.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateArchMongoMapper extends  Arch{

  constructor( createArchDto : CreateArchDto ) {
    super();
    this.chainId=createArchDto.chainId
    this.rateWithdraw=createArchDto.rateWithdraw
    this.slug=createArchDto.slug
    this.description=createArchDto.description
    this.symbol=createArchDto.symbol
    this.status=createArchDto.status
  }
}