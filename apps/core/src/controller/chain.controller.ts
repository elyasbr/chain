import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { PaginateChainRMapper } from '../modules/chain/rmapper/paginate-chain-r.mapper';
import { FilterArchOfChainDto } from '../modules/chain/dtos/filter-arch-of-chain.dto';
import { PaginateArchRMapper } from '../modules/arch/rmapper/paginate-arch-r.mapper';

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
  @ApiOperation({summary : "Create Chain"})
  @ApiCreatedObjectResponse(  PaginateChainRMapper)
  createChain(@Body() createChainDto : CreateChainDto) {
    return this.chainService.createChain(createChainDto)
  }

  @Put("/:chainId")
  @ApiOperation({summary : "Update Chain"})
  @ApiOkObjectResponse(  PaginateChainRMapper)
  updateChain( @Param('chainId')  chainId : string ,@Body() updateChainDto : UpdateChainDto) {
    return this.chainService.updateChain(chainId ,updateChainDto)
  }

  @Get("/:chainId")
  @ApiOperation({summary : "Get Chain"})
  @ApiOkObjectResponse(GetChainRMapper)
  getChain( @Param('chainId')  chainId : string ) {
    return this.chainService.getChain(chainId )
  }

  @Delete("/:chainId")
  @ApiOperation({summary : "Delete Chain"})
  @ApiOkObjectResponse(  DeleteResponseDto)
  deleteChain( @Param('chainId')  chainId : string ) {
    return this.chainService.deleteChain(chainId )
  }

  @Post("/pagination")
  @ApiOperation({summary : "Pagination Chain"})
  @ApiCreatedArrayResponse( PaginateChainRMapper)
  getPagination(@Body() filterChainDto : FilterChainDto) {
    return this.chainService.getPagination(filterChainDto)
  }

  @Post("/pagination/arch/:chainId")
  @ApiOperation({ summary: 'Pagination Arch  From Chain'  })
  @ApiCreatedArrayResponse( PaginateArchRMapper)
  getPaginationArchFromChain(@Param('chainId')  chainId : string  ,@Body() filterArchOfChainDto : FilterArchOfChainDto) {
    return this.chainService.getPaginationArchFromChain(chainId  ,filterArchOfChainDto)
  }
}
