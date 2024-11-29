import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { StructService } from '../modules/struct/struct.service';
import { CreateStructDto } from '../modules/struct/dtos/create-struct.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterStructDto } from '../modules/struct/dtos/filter-struct.dto';
import { Struct } from '@app/common/dataBase/mongo/schemas/struct.schema';
import {
  ApiCreatedArrayResponse,
  ApiCreatedObjectResponse,
  ApiOkArrayResponse, ApiOkObjectResponse, DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { UpdateStructDto } from '../modules/struct/dtos/update-struct.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateIpgMongoMapper } from '../modules/ipg/mapper/ipg/create-ipg-mongo.mapper';
import { CreateStructMongoMapper } from '../modules/struct/mapper/create-struct-mongo.mapper';
import { UpdateStructMongoMapper } from '../modules/struct/mapper/update-struct-mongo.mapper';
import { GetStructRMapper } from '../modules/struct/rmapper/get-struct-r.mapper';
import { PaginateStructRMapper } from '../modules/struct/rmapper/paginate-struct-r.mapper';
import { FilterChainsOfStructDto } from '../modules/struct/dtos/filter-chains-of-struct.dto';

@Controller({
  path : "blockchain/struct" ,
  version : "1"
})
@ApiTags("Struct")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class StructController {
  constructor(private readonly structService: StructService) {}

  @Post("/")
  @ApiCreatedObjectResponse(  PaginateStructRMapper)
  createStruct(@Body() createStructDto : CreateStructDto) {
    return this.structService.createStruct(createStructDto)
  }
  @Put("/:structId")
  @ApiCreatedObjectResponse(  PaginateStructRMapper)
  updateStruct( @Param('structId')  structId : string ,@Body() updateStructDto : UpdateStructDto) {
    return this.structService.updateStruct(structId ,updateStructDto)
  }

  @Get("/:structId")
  @ApiCreatedObjectResponse(  GetStructRMapper)
  getStruct( @Param('structId')  structId : string ) {
    return this.structService.getStruct(structId )
  }

  @Delete("/:structId")
  @ApiCreatedArrayResponse(  DeleteResponseDto)
  deleteStruct( @Param('structId')  structId : string ) {
    return this.structService.deleteStruct(structId )
  }

  @Post("/pagination")
  @ApiCreatedArrayResponse( PaginateStructRMapper)
  getPagination(@Body() filterStructDto : FilterStructDto) {
    return this.structService.getPagination(filterStructDto)
  }
  @Post("/pagination/chain/:structId")
  @ApiCreatedArrayResponse( PaginateStructRMapper)
  getPaginationChainsOfStruct(@Param('structId')  structId : string  ,@Body() filterChainsOfStructDto : FilterChainsOfStructDto) {
    return this.structService.getPaginationChains(structId  ,filterChainsOfStructDto)
  }
}
