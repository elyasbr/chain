import { CreateStructDto } from '../dtos/create-struct.dto';



import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import { UpdateStructDto } from '../dtos/update-struct.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateStructMongoMapper extends  Struct{

  constructor( updateStructDto : UpdateStructDto ) {
    super();
    this.slug=updateStructDto.slug
    this.regex=updateStructDto.regex
    this.addressServer = updateStructDto.addressServer
    this.description=updateStructDto.description
    this.symbol=updateStructDto.symbol
    this.status=updateStructDto.status
  }
}