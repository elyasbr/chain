import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import {
  Allow,
  IsArray, IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { IpgError } from '@elyasbr/tools-chain/dist/src';
import { MethodsEnum, PublicError } from '@elyasbr/public/dist/src';
import { LinkBackendIpgDto } from './link-backend-ipg.dto';
import { CallBackBackendIpgDto } from './call-back-backend-ipg.dto';
import { Type } from 'class-transformer';
export class UpdateIpgDto {
  @ApiProperty({
    example : "ipg1" ,
    description :"slug of ipg" ,
    required : true
  })
  @IsString({
    message: JSON.stringify(IpgError.SLUG_IPG_IS_REQUIRED),
  })
  @IsNotEmpty({
    message: JSON.stringify(IpgError.SLUG_IPG_IS_EMPTY),
  })
  slug: string;

  @ApiProperty({
    description :"link get data from backend ipg" ,
    type : LinkBackendIpgDto ,
    required : true
  })
  @IsObject({
    message: JSON.stringify(IpgError.LINK_BACKEND_IPG_IS_REQUIRED),
  })
  @ValidateNested({ each: true ,
    message: JSON.stringify(IpgError.LINK_BACKEND_IPG_IS_REQUIRED),
  })
  @Type(() => LinkBackendIpgDto)
  linkBackend: LinkBackendIpgDto;


  @ApiProperty({
    example : "http://www.gmail.com" ,
    required : true
  })
  @IsString({
    message: JSON.stringify(IpgError.FRONT_LINK_IPG_IS_REQUIRED),
  })
  @IsNotEmpty({
    message : JSON.stringify(IpgError.FRONT_LINK_IPG_IS_EMPTY)
  })
  frontLink: string;

  @ApiProperty({
    description :"link get data from call backend ipg" ,
    required : true
  })
  @IsObject({
    message: JSON.stringify(IpgError.CALL_BACK_BACKEND_IPG_IS_REQUIRED),
  })
  @ValidateNested({ each: true ,
    message: JSON.stringify(IpgError.CALL_BACK_BACKEND_IPG_IS_REQUIRED),
  })
  @Type(() => CallBackBackendIpgDto)
  callBackBackend: CallBackBackendIpgDto;

  @ApiProperty({
    example : "http://www.gmail.com" ,
    required : true
  })
  @IsString({
    message: JSON.stringify(IpgError.FRONT_CALL_BACK_IPG_IS_REQUIRED),
  })
  @IsNotEmpty({
    message : JSON.stringify(IpgError.FRONT_CALL_BACK_IPG_IS_EMPTY)
  })
  frontCallBack: string;

  @ApiProperty({
    enum: TypeIpgEnum,
    required : true ,
    example: TypeIpgEnum.CRYPTO,
  })
  @IsEnum(TypeIpgEnum, {
    message: JSON.stringify(IpgError.TYPE_IPG_IS_REQUIRED),
  })
  typeIpg: TypeIpgEnum;

  @ApiProperty({
    required : true
  })
  @IsBoolean({
    message : JSON.stringify(IpgError.STATUS_IPG_IS_REQUIRED)
  })
  status: Boolean;
}