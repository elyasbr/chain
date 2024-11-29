import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedArrayResponse,
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { ChainService } from '../modules/chain/chain.service';
import { CreateChainDto } from '../modules/chain/dtos/create-chain.dto';
import { UpdateChainDto } from '../modules/chain/dtos/update-chain.dto';
import { FilterChain, FilterChainDto } from '../modules/chain/dtos/filter-chain.dto';
import { GetChainRMapper } from '../modules/chain/rmapper/get-chain-r.mapper';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateChainMongoMapper } from '../modules/chain/mapper/create-chain-mongo.mapper';
import { UpdateChainMongoMapper } from '../modules/chain/mapper/update-chain-mongo.mapper';
import { PaginateChainRMapper } from '../modules/chain/rmapper/paginate-chain-r.mapper';

@Controller({
  path : "blockchain/chain" ,
  version : "1"
})
@ApiTags("Chain")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class ChainController {
  constructor(private readonly chainService: ChainService) {}

  @Post("/")
  @ApiCreatedObjectResponse(  PaginateChainRMapper)
  createChain(@Body() createChainDto : CreateChainDto) {
    return this.chainService.createChain(createChainDto)
  }

  @Put("/:chainId")
  @ApiOkObjectResponse(  PaginateChainRMapper)
  updateChain( @Param('chainId')  chainId : string ,@Body() updateChainDto : UpdateChainDto) {
    return this.chainService.updateChain(chainId ,updateChainDto)
  }

  @Get("/:chainId")
  @ApiOkObjectResponse(GetChainRMapper)
  getChain( @Param('chainId')  chainId : string ) {
    return this.chainService.getChain(chainId )
  }

  @Delete("/:chainId")
  @ApiOkObjectResponse(  DeleteResponseDto)
  deleteChain( @Param('chainId')  chainId : string ) {
    return this.chainService.deleteChain(chainId )
  }

  @Post("/pagination")
  @ApiCreatedArrayResponse( PaginateChainRMapper)

  getPagination(@Body() filterChainDto : FilterChainDto) {
    return this.chainService.getPagination(filterChainDto)
  }
}
