import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { IsEmpty, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { IpgError } from '@elyasbr/tools-chain/dist/src';
import { PublicError } from '@elyasbr/public/dist/src';
import { LinkBackendIpgDto } from '../../dtos/ipg/link-backend-ipg.dto';
import { CallBackBackendIpgDto } from '../../dtos/ipg/call-back-backend-ipg.dto';

export class PaginateIpgRMapper {
  @ApiProperty()
  ipgId : string

  @ApiProperty()
  slug : string

  @ApiProperty()
  linkBackend : LinkBackendIpgDto

  @ApiProperty()
  frontLink : string

  @ApiProperty()
  callBackBackend : CallBackBackendIpgDto

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