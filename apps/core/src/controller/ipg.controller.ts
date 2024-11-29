import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';

import { ApiAcceptedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedArrayResponse,
  ApiCreatedObjectResponse,
  ApiOkArrayResponse, ApiOkObjectResponse, DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';

import { IpgService } from '../modules/ipg/ipg.service';
import { CreateIpgDto } from '../modules/ipg/dtos/ipg/create-ipg.dto';
import { UpdateIpgDto } from '../modules/ipg/dtos/ipg/update-ipg.dto';
import { FilterIpgDto } from '../modules/ipg/dtos/ipg/filter-ipg.dto';
import { Ipg } from '@app/common/dataBase/mongo/schemas/ipg.schema';

import { CreateIpgMongoMapper } from '../modules/ipg/mapper/ipg/create-ipg-mongo.mapper';

import { UpdateIpgMongoMapper } from '../modules/ipg/mapper/ipg/update-ipg-mongo.mapper';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { GetIpgRMapper } from '../modules/ipg/rmapper/ipg/get-ipg-r.mapper';
import { PaginateIpgRMapper } from '../modules/ipg/rmapper/ipg/paginate-ipg-r.mapper';


@Controller({
  path : "blockchain/ipg" ,
  version : "1"
})
@ApiTags("Ipg")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class IpgController {
  constructor(private readonly ipgService: IpgService) {}

  @Post("/")
  @ApiCreatedObjectResponse(  PaginateIpgRMapper)
  createIpg(@Body() createIpgDto : CreateIpgDto) {
    console.log(createIpgDto)
    return this.ipgService.createIpg(createIpgDto)
  }
  @Put("/:ipgId")
  @ApiOkObjectResponse(  PaginateIpgRMapper)
  updateIpg( @Param('ipgId')  ipgId : string ,@Body() updateIpgDto : UpdateIpgDto) {
    return this.ipgService.updateIpg(ipgId ,updateIpgDto)
  }

  @Get("/:ipgId")
  @ApiOkObjectResponse(  GetIpgRMapper)
  getIpg( @Param('ipgId')  ipgId : string ) {
    return this.ipgService.getIpg(ipgId )
  }

  @Delete("/:ipgId")
  @ApiOkObjectResponse(  DeleteResponseDto)
  deleteIpg( @Param('ipgId')  ipgId : string ) {
    return this.ipgService.deleteIpg(ipgId )
  }

  @Post("/pagination")
  @ApiCreatedArrayResponse( PaginateIpgRMapper)
  getPagination(@Body() filterIpgDto : FilterIpgDto ) {
    console.log(filterIpgDto)
    return this.ipgService.getPagination(filterIpgDto)
  }


}
