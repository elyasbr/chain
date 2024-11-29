import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedArrayResponse,
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { CreateArchDto } from '../modules/arch/arch/create-arch.dto';
import { UpdateArchDto } from '../modules/arch/arch/update-arch.dto';
import { FilterArchDto } from '../modules/arch/arch/filter-arch.dto';
import { FilterCryptoDto } from '../modules/asset/dtos/crypto/filter-crypto.dto';
import { ArchService } from '../modules/arch/arch.service';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateChainMongoMapper } from '../modules/chain/mapper/create-chain-mongo.mapper';
import { CreateArchMongoMapper } from '../modules/arch/mapper/create-arch-mongo.mapper';
import { UpdateArchMongoMapper } from '../modules/arch/mapper/update-arch-mongo.mapper';
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
  @ApiCreatedObjectResponse(  PaginateArchRMapper)
  createArch(@Body() createArchDto : CreateArchDto) {
    return this.archService.createArch(createArchDto)
  }

  @Put("/:archId")
  @ApiOkObjectResponse(  PaginateArchRMapper)
  updateArch( @Param('archId')  archId : string ,@Body() updateArchDto : UpdateArchDto) {
    return this.archService.updateArch(archId ,updateArchDto)
  }

  @Get("/:archId")
  @ApiOkObjectResponse(GetArchRMapper)
  getArch( @Param('archId')  archId : string ) {
    return this.archService.getArch(archId )
  }

  @Delete("/:archId")
  deleteArch( @Param('archId')  archId : string ) {
    return this.archService.deleteArch(archId )
  }

  @Post("/pagination")
  @ApiCreatedArrayResponse(PaginateArchRMapper)
  getPagination(@Body() filterArchDto : FilterArchDto) {
    return this.archService.getPagination(filterArchDto)
  }
  @Post("/pagination/:archId")
  @ApiCreatedArrayResponse(PaginateCryptoRMapper)
  getPaginationCrypto( @Param('archId')  archId : string ,  @Body() filterCryptoDto : FilterCryptoDto) {
    return this.archService.getPaginationCrypto(archId , filterCryptoDto)
  }
}
