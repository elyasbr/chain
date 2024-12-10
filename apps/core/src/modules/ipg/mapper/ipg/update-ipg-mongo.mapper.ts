import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../../chain/dtos/create-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { CreateArchDto } from '../../../arch/dtos/create-arch.dto';
import { CreateIpgDto } from '../../dtos/ipg/create-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { UpdateIpgDto } from '../../dtos/ipg/update-ipg.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';


export class UpdateIpgMongoMapper extends  Ipg{

  constructor( updateIpgDto : UpdateIpgDto ) {
    super();
    this.slug = updateIpgDto.slug
    this.linkBackend = updateIpgDto.linkBackend
    this.frontLink=updateIpgDto.frontLink
    this.callBackBackend=updateIpgDto.callBackBackend
    this.frontCallBack=updateIpgDto.frontCallBack
    this.typeIpg=updateIpgDto.typeIpg
    this.status=updateIpgDto.status
  }
}