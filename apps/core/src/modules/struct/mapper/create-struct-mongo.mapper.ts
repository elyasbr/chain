import { CreateStructDto } from '../dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { ApiProperty } from '@nestjs/swagger';


export class CreateStructMongoMapper extends  Struct{


  constructor( createStructDto : CreateStructDto ) {
    super();
    console.log(createStructDto)
    this.slug=createStructDto.slug
    this.regex=createStructDto.regex
    this.addressServer = createStructDto.addressServer
    this.description=createStructDto.description
    this.symbol=createStructDto.symbol
    this.status=createStructDto.status
  }
}