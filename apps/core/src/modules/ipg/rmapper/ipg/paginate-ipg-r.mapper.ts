import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { IsEmpty, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { IpgError } from '@elyasbr/tools-chain/dist/src';
import { PublicError } from '@elyasbr/public/dist/src';

export class PaginateIpgRMapper {
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
    enum : TypeIpgEnum
  })
  typeIpg : TypeIpgEnum

  @ApiProperty()
  status : Boolean

  @ApiProperty()
  created_at : string
}