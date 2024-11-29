import { CreateIpgDto } from '../../ipg/dtos/ipg/create-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';


export class PaginateChainRMapper  {
  @ApiProperty()
  chainId : string

  @ApiProperty()
  structId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  description : string

  @ApiProperty()
  symbol : string

  @ApiProperty()
  status :Boolean

  @ApiProperty({
    type : Date ,
    default : (new Date()).toJSON()
  })
  created_at :Date
}