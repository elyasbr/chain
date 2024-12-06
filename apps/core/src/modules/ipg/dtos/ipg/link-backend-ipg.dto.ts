import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsArray, IsEmpty, IsEnum, IsNotEmpty, IsObject, IsString, IsUrl } from 'class-validator';
import { IpgError } from '@elyasbr/tools-chain/dist/src';
import { MethodsEnum, PublicError } from '@elyasbr/public/dist/src';
export class LinkBackendIpgDto {
  @ApiProperty({
    example : "http://www.gmail.com" ,
    required : true ,
    description :"link backend ipg for call request"
  })
  @IsString({
    message: JSON.stringify(IpgError.URL_LINK_BACKEND_IPG_IS_REQUIRED),
  })
  @IsUrl({
    require_host: true,
  }, { message: JSON.stringify(PublicError.URL_IS_INVALID) })
  url : string

  @ApiProperty({
    description :"array body if you need data array else you send only array without data" ,
    required : true
  })
  @IsArray({

    message: JSON.stringify(IpgError.BODY_LINK_BACKEND_IPG_IS_REQUIRED),
  })
  body:string[]

  @ApiProperty({
    description :"methods call request to  backend ipg" ,
    enum :MethodsEnum ,
    default : MethodsEnum.GET ,
    required : true
  })
  @IsEnum(MethodsEnum ,{
    message : JSON.stringify(IpgError.METHODS_LINK_BACKEND_IPG_IS_REQUIRED)
  })
  method : MethodsEnum
}

