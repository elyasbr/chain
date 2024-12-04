import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsBoolean, IsString } from 'class-validator';
import { StructError } from '@elyasbr/tools-chain/dist/src';

export class UpdateStructDto {
  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(StructError.SLUG_FIELD_STRUCT_IS_REQUIRED)
  })
  slug : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(StructError.REGEX_FIELD_STRUCT_IS_REQUIRED)
  })
  regex : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(StructError.HTTP_SERVER_FIELD_STRUCT_IS_REQUIRED)
  })
  httpServer : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(StructError.MICROSERVICE_FIELD_STRUCT_IS_REQUIRED)
  })
  microserviceServer : string


  @ApiProperty()
  @Allow()
  description : string

  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(StructError.SYMBOL_FIELD_STRUCT_IS_REQUIRED)
  })
  symbol : string

  @ApiProperty({
    default : true
  })
  @Allow()
  @IsBoolean({
    message : JSON.stringify(StructError.STATUS_FIELD_STRUCT_IS_REQUIRED)
  })
  status :Boolean
}