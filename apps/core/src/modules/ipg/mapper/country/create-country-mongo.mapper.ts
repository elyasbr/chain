import { CreateStructDto } from '../../../struct/dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { Chain } from '@app/common/dataBase/mongo/schemas/chain.schema';
import { CreateChainDto } from '../../../chain/dtos/create-chain.dto';
import { Arch } from '@app/common/dataBase/mongo/schemas/arch.schema';
import { CreateArchDto } from '../../../arch/dtos/create-arch.dto';
import { CreateIpgDto } from '../../dtos/ipg/create-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { Country } from '@app/common/dataBase/mongo/schemas/country.schema';
import { CreateCountryDto } from '../../dtos/country/create-country.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCountryMongoMapper extends  Country{


  constructor( createCountryDto : CreateCountryDto ) {
    super();
    this.slug = createCountryDto.slug
    this.iso2 = createCountryDto.iso2
    this.iso3=createCountryDto.iso3
    this.status = createCountryDto.status

  }
}