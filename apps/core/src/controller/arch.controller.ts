import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedArrayResponse,
  ApiCreatedObjectResponse,
  ApiOkObjectResponse, DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { CreateArchDto } from '../modules/arch/dtos/create-arch.dto';
import { UpdateArchDto } from '../modules/arch/dtos/update-arch.dto';
import { FilterArchDto } from '../modules/arch/dtos/filter-arch.dto';
import { FilterCryptoDto } from '../modules/asset/dtos/crypto/filter-crypto.dto';
import { ArchService } from '../modules/arch/arch.service';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { GetArchRMapper } from '../modules/arch/rmapper/get-arch-r.mapper';
import { PaginateArchRMapper } from '../modules/arch/rmapper/paginate-arch-r.mapper';
import { PaginateCryptoRMapper } from '../modules/asset/rmapper/crypto/paginate-crypto-r.mapper';

@Controller({
  path : "blockchain/arch" ,
  version : "1"
})
@ApiTags("Arch")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class ArchController {
  constructor(private readonly archService: ArchService) {}

  @Post("/")
  @ApiOperation({summary : "Create Arch "})
  @ApiCreatedObjectResponse(  PaginateArchRMapper)
  createArch(@Body() createArchDto : CreateArchDto) {
    return this.archService.createArch(createArchDto)
  }

  @Put("/:archId")
  @ApiOperation({summary : "Update Arch "})
  @ApiOkObjectResponse(  PaginateArchRMapper)
  updateArch( @Param('archId')  archId : string ,@Body() updateArchDto : UpdateArchDto) {
    return this.archService.updateArch(archId ,updateArchDto)
  }

  @Get("/:archId")
  @ApiOperation({summary : "Get Arch "})
  @ApiOkObjectResponse(GetArchRMapper)
  getArch( @Param('archId')  archId : string ) {
    return this.archService.getArch(archId )
  }

  @Delete("/:archId")
  @ApiOperation({summary : "Delete Arch "})
  @ApiOkObjectResponse(DeleteResponseDto)
  deleteArch( @Param('archId')  archId : string ) {
    return this.archService.deleteArch(archId )
  }

  @Post("/pagination")
  @ApiOperation({summary : "Pagination Arch "})
  @ApiCreatedArrayResponse(PaginateArchRMapper)
  getPagination(@Body() filterArchDto : FilterArchDto) {
    return this.archService.getPagination(filterArchDto)
  }
  @Post("/pagination/:archId")
  @ApiOperation({summary : "Pagination Crypto From Arch "})
  @ApiCreatedArrayResponse(PaginateCryptoRMapper)
  getPaginationCrypto( @Param('archId')  archId : string ,  @Body() filterCryptoDto : FilterCryptoDto) {
    return this.archService.getPaginationCrypto(archId , filterCryptoDto)
  }
}
