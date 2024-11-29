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
import { UpdateCountryDto } from '../../dtos/country/update-country.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateCountryMongoMapper extends  Country{

  constructor( updateCountryDto : UpdateCountryDto ) {
    super();
    this.slug = updateCountryDto.slug
    this.iso2 = updateCountryDto.iso2
    this.iso3=updateCountryDto.iso3
    this.status = updateCountryDto.status
   
  }
}