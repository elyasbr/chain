import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';

import { CreateAssetDto } from '../modules/asset/dtos/asset/create-asset.dto';
import { UpdateAssetDto } from '../modules/asset/dtos/asset/update-asset.dto';
import { FilterAssetDto } from '../modules/asset/dtos/asset/filter-asset.dto';
import { AssetService } from '../modules/asset/asset.service';
import { CryptoService } from '../modules/asset/crypto.service';
import { CreateCryptoDto } from '../modules/asset/dtos/crypto/create-crypto.dto';
import { UpdateCryptoDto } from '../modules/asset/dtos/crypto/update-crypto.dto';
import { FilterCryptoDto } from '../modules/asset/dtos/crypto/filter-crypto.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateCryptoMongoMapper } from '../modules/asset/mapper/crypto/create-crypto-mongo.mapper';
import { UpdateCryptoMongoMapper } from '../modules/asset/mapper/crypto/update-crypto-mongo.mapper';
import {  GetCryptoRMapper } from '../modules/asset/rmapper/crypto/get-crypto-r.mapper';
import { PaginateCryptoRMapper } from '../modules/asset/rmapper/crypto/paginate-crypto-r.mapper';
import { GroupAssetEnum } from '@app/common/enums/group-asset.enum';

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
    console.log(createCryptoDto)
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
