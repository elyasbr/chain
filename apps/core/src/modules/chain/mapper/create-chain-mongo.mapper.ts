import { CreateStructDto } from '../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../dtos/create-chain.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateChainMongoMapper extends  Chain{

  constructor( createChainDto : CreateChainDto ) {
    super();
    this.structId=createChainDto.structId
    this.slug=createChainDto.slug
    this.description=createChainDto.description
    this.symbol=createChainDto.symbol
    this.status=createChainDto.status
  }
}