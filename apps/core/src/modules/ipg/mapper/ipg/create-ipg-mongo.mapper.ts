import { CreateIpgDto } from '../../dtos/ipg/create-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';


export class CreateIpgMongoMapper extends  Ipg {


  constructor( createIpgDto : CreateIpgDto ) {
    super();
    this.slug = createIpgDto.slug
    this.linkBackend = createIpgDto.linkBackend
    this.frontLink = createIpgDto.frontLink
    this.callBackBackend=createIpgDto.callBackBackend
    this.frontCallBack =createIpgDto.frontCallBack
    this.typeIpg=createIpgDto.typeIpg
    this.status=createIpgDto.status
  }
}