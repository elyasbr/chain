import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';

import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';
import { CountryService } from '../modules/ipg/country.service';
import { CreateCountryDto } from '../modules/ipg/dtos/country/create-country.dto';
import { UpdateCountryDto } from '../modules/ipg/dtos/country/update-country.dto';
import { FilterCountryDto } from '../modules/ipg/dtos/country/filter-country.dto';
import { CreateCountryBankDto } from '../modules/ipg/dtos/country/create-country-bank.dto';
import { CreateCountryBankRlCryptoDto } from '../modules/ipg/dtos/country/create-country-bank-rl-crypto.dto';
import { CreateCountryBankCryptoRlIpgDto } from '../modules/ipg/dtos/country/create-country-bank-crypto-rl-ipg.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { GetCountryRMapper } from '../modules/ipg/rmapper/country/get-country-r.mapper';
import { PaginateCountryRMapper } from '../modules/ipg/rmapper/country/paginate-country-r.mapper';

import { FilterCountryBankDto } from '../modules/ipg/dtos/country/filter-country-bank.dto';
import { PaginateCountryBankRMapper } from '../modules/ipg/rmapper/country/paginate-country-bank-r.mapper';
import { PaginateCountryBankRlCrypto } from '../modules/ipg/rmapper/country/paginate-country-bank-rl-crypto';
import {

  FilterCountryBankRlCryptoDto,
} from '../modules/ipg/dtos/country/filter-country-bank-rl-crypto.dto';
import {
  PaginateCountryBankCryptoRlIpgRMapper
} from '../modules/ipg/rmapper/country/paginate-country-bank-crypto-rl-ipg-r.mapper';
import { FilterCountryBankCryptoRlIpgDto } from '../modules/ipg/dtos/country/filter-country-bank-crypto-rl-ipg.dto';

@Controller({
  path : "blockchain/country" ,
  version : "1"
})
@ApiTags("Country")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}


  @Post("/bank/crypto/paginate/:countryBankCryptoId")
  @ApiOperation({summary : "Pagination  Ipg From CountryBankCrypto"})
  @ApiCreatedObjectResponse(PaginateCountryBankCryptoRlIpgRMapper)
  getPaginationIpgFromCountryBankCrypto(@Param('countryBankCryptoId') countryBankCryptoId:string,
                                        @Body() filterCountryBankCryptoRlIpgDto : FilterCountryBankCryptoRlIpgDto) {
    return this.countryService.getPaginationIpgFromCountryBankCrypto(countryBankCryptoId ,filterCountryBankCryptoRlIpgDto )
  }
  @Post("/")
  @ApiOperation({summary : "Create Country"})
  @ApiCreatedObjectResponse(  PaginateCountryRMapper)
  createIpg(@Body() createCountryDto : CreateCountryDto) {
    return this.countryService.createCountry(createCountryDto)
  }

  @Put("/:countryId")
  @ApiOperation({summary : "Update Country"})
  @ApiOkObjectResponse(  PaginateCountryRMapper)
  updateCountry( @Param('countryId')  countryId : string ,@Body() updateCountryDto : UpdateCountryDto) {
    return this.countryService.updateCountry(countryId ,updateCountryDto)
  }

  @Get("/:countryId")
  @ApiOperation({summary : "Get Country"})
  @ApiOkObjectResponse(GetCountryRMapper)
  getCountry( @Param('countryId')  countryId : string ) {
    return this.countryService.getCountry(countryId )
  }

  @Delete("/:countryId")
  @ApiOperation({summary : "Delete Country"})
  @ApiOkObjectResponse(DeleteResponseDto)
  deleteCountry( @Param('countryId')  countryId : string ) {
    return this.countryService.deleteCountry(countryId )
  }

  @Post("/pagination")
  @ApiOperation({summary : "Pagination Country"})
  @ApiOkObjectResponse(PaginateCountryRMapper)
  getPaginationCountry(@Body() filterCountryDto : FilterCountryDto) {
    return this.countryService.getPagination(filterCountryDto)
  }

  @Post("/bank/add")
  @ApiOperation({summary : "Add Bank To Country"})
  @ApiOkObjectResponse(PaginateCountryBankRMapper)
  addBankToCountry( @Body()  createCountryBankDto : CreateCountryBankDto )   {
    return this.countryService.addBankToCountry(createCountryBankDto )
  }

  @Delete("/bank/remove/:countryBankId")
  @ApiOperation({summary : "Delete Bank From Country"})
  @ApiOkObjectResponse(DeleteResponseDto)
  removeBankToCountry( @Param('countryBankId')  countryBankId : string) {
    return this.countryService.removeBankToCountry(countryBankId )
  }

  @Post("/bank/paginate/:countryId")
  @ApiOperation({summary : "Get Pagination Bank From Country"})
  @ApiOkObjectResponse(PaginateCountryBankRMapper)
  getPaginationBankFromCountry(@Param('countryId') countryId:string,@Body() filterCountryBankDto : FilterCountryBankDto) {
    return this.countryService.getPaginationBankFromCountry(countryId ,filterCountryBankDto )
  }



  @Post("/bank/crypto/add")
  @ApiOperation({summary : "Add Crypto To CountryBank"})
  @ApiCreatedObjectResponse(PaginateCountryBankRlCrypto)
  addCryptoToCountryBank( @Body()  createCountryBankRlCryptoDto : CreateCountryBankRlCryptoDto ) {
    return this.countryService.addCryptoToCountryBank(createCountryBankRlCryptoDto )
  }

  @Delete("/bank/crypto/remove/:countryBankCryptoId")
  @ApiOperation({summary : "Delete Crypto From CountryBank"})
  @ApiOkObjectResponse(DeleteResponseDto)
  removeCryptoFromCountryBank( @Param('countryBankCryptoId')  countryBankCryptoId : string) {
    return this.countryService.removeCryptoFromCountryBank(countryBankCryptoId )
  }

  @Post("/bank/crypto/paginate/:countryBankId")
  @ApiOperation({summary : "Pagination Crypto From CountryBank"})

  @ApiCreatedObjectResponse(PaginateCountryBankRlCrypto)
  getPaginationCryptoFromCountryBank(@Param('countryBankId') countryBankId:string,@Body() filterCountryBankRlCryptoDto : FilterCountryBankRlCryptoDto) {
    return this.countryService.getPaginationCryptoFromCountryBank(countryBankId ,filterCountryBankRlCryptoDto )
  }

  @Post("/bank/crypto/ipg/add")
  @ApiOperation({summary : "Add Ipg To CountryBankCrypto"})
  @ApiCreatedObjectResponse(PaginateCountryBankCryptoRlIpgRMapper)
  addIpgToCountryBankCrypto( @Body()  createCountryBankCryptoRlIpgDto : CreateCountryBankCryptoRlIpgDto ) {
    return this.countryService.addIpgToCountryBankCrypto(createCountryBankCryptoRlIpgDto )
  }

  @Delete("/bank/crypto/ipg/remove/:countryBankCryptoIpgId")
  @ApiOperation({summary : "Delete Ipg To CountryBankCrypto"})

  @ApiOkObjectResponse(DeleteResponseDto)
  removeIpgFromCountryBankCrypto( @Param('countryBankCryptoIpgId')  countryBankCryptoIpgId : string) {
    return this.countryService.removeIpgFromCountryBankCrypto(countryBankCryptoIpgId )
  }


}
