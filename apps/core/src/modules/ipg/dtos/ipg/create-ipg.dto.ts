import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsEmpty, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { IpgError } from '@elyasbr/tools-chain/dist/src';
import { PublicError } from '@elyasbr/public/dist/src';

export class CreateIpgDto {
  @ApiProperty({
    example : "ipg1"
  })
  @IsString({
    message: JSON.stringify(IpgError.SLUG_IPG_IS_REQUIRED),
  })
  slug: string;

  @ApiProperty({
    example : "http://www.gmail.com"
  })
  @IsString({
    message: JSON.stringify(IpgError.LINK_IPG_IS_REQUIRED),
  })
  @IsUrl({
    require_host: true,
  }, { message: JSON.stringify(PublicError.URL_IS_INVALID) })
  link: string;


  @ApiProperty({
    example : "http://www.gmail.com"
  })
  @IsString({
    message: JSON.stringify(IpgError.LINK_FRONT_IPG_IS_REQUIRED),
  })
  frontLink: string;

  @ApiProperty({
    example : "http://www.google.com"
  })
  @IsString({
    message: JSON.stringify(IpgError.CALL_BACK_IPG_IS_REQUIRED),
  })
  @IsUrl({
    require_host: true,
  }, { message: JSON.stringify(PublicError.URL_IS_INVALID) })
  callBack: string;

  @ApiProperty({
    example : "http://www.gmail.com"
  })
  @IsString({
    message: JSON.stringify(IpgError.CALL_BACK_FRONT_IPG_IS_REQUIRED),
  })
  frontCallBack: string;

  @ApiProperty({
    enum: TypeIpgEnum,
    example: TypeIpgEnum.CRYPTO,
  })
  @IsEnum(TypeIpgEnum, {
    message: JSON.stringify(IpgError.TYPE_IPG_IS_REQUIRED),
  })
  typeIpg: TypeIpgEnum;


  @ApiProperty()
  @IsNotEmpty({
    message : JSON.stringify(IpgError.STATUS_IPG_IS_REQUIRED)
  })
  status: Boolean;
}