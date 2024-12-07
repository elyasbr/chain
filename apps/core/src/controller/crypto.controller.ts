import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { CryptoService } from '../modules/asset/crypto.service';
import { CreateCryptoDto } from '../modules/asset/dtos/crypto/create-crypto.dto';
import { UpdateCryptoDto } from '../modules/asset/dtos/crypto/update-crypto.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import {  GetCryptoRMapper } from '../modules/asset/rmapper/crypto/get-crypto-r.mapper';
import { PaginateCryptoRMapper } from '../modules/asset/rmapper/crypto/paginate-crypto-r.mapper';

@Controller({
  path : "blockchain/crypto" ,
  version : "1"
})
@ApiTags("Crypto")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post("/")
  @ApiCreatedObjectResponse(PaginateCryptoRMapper)
  createAsset(@Body() createCryptoDto : CreateCryptoDto) {
    return this.cryptoService.createCrypto(createCryptoDto)
  }

  @Put("/:cryptoId")
  @ApiOkObjectResponse(PaginateCryptoRMapper)
  updateCrypto( @Param('cryptoId')  cryptoId : string ,@Body() updateCryptoDto : UpdateCryptoDto) {
    return this.cryptoService.updateCrypto(cryptoId ,updateCryptoDto)
  }

  @Get("/:cryptoId")
  @ApiOkObjectResponse(GetCryptoRMapper)
  getCrypto( @Param('cryptoId')  cryptoId : string ) {
    return this.cryptoService.getCrypto(cryptoId )
  }

  @Delete("/:cryptoId")
  @ApiOkObjectResponse(DeleteResponseDto)
  deleteAsset( @Param('cryptoId')  cryptoId : string ) {
    return this.cryptoService.deleteCrypto(cryptoId )
  }


}
