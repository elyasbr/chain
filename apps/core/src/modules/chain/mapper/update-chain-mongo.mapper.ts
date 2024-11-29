import { CreateStructDto } from '../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../dtos/create-chain.dto';
import { UpdateChainDto } from '../dtos/update-chain.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateChainMongoMapper extends  Chain{
  constructor( updateChainDto : UpdateChainDto ) {
    super();
    this.structId=updateChainDto.structId
    this.slug=updateChainDto.slug
    this.description=updateChainDto.description
    this.symbol=updateChainDto.symbol
    this.status=updateChainDto.status
  }
}