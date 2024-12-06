import { CreateIpgDto } from '../../dtos/ipg/create-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';


export class GetIpgRMapper  {
  @ApiProperty()
  ipgId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  link : string

  @ApiProperty()
  frontLink : string

  @ApiProperty()
  callBack : string

  @ApiProperty()
  frontCallBack : string

  @ApiProperty({
    enum : TypeIpgEnum ,
    default : TypeIpgEnum.CRYPTO
  })
  typeIpg : TypeIpgEnum

  @ApiProperty()
  status : Boolean

  @ApiProperty({
    default: (new Date()).toJSON()
  })
  created_at : Date


}