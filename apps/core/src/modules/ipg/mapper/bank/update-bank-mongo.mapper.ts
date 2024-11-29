import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../../chain/dtos/create-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { CreateArchDto } from '../../../arch/arch/create-arch.dto';
import { CreateIpgDto } from '../../dtos/ipg/create-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { Country } from '@app/common/dataBase/mongo/schemas/country.schema';
import { CreateCountryDto } from '../../dtos/country/create-country.dto';
import { Bank } from '@app/common/dataBase/mongo/schemas/bank.schema';
import { CreateBankDto } from '../../dtos/bank/create-bank.dto';
import { UpdateBankDto } from '../../dtos/bank/update-bank.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateBankMongoMapper extends  Bank{
  @ApiProperty()
  id : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  iconFileId : string

  @ApiProperty()
  status : Boolean

  @ApiProperty({
    default : (new Date()).toJSON()
  })
  created_at : Date
  constructor( updateBankDto : UpdateBankDto ) {
    super();
    this.slug = updateBankDto.slug
    this.iconFileId = updateBankDto.iconFileId
    this.status = updateBankDto.status

  }
}