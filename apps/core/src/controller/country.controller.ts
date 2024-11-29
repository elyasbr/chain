import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';

import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedObjectResponse,
  ApiOkObjectResponse,
  DeleteResponseDto,
  ResponseInterceptor,
} from '@elyasbr/public/dist/src';

import { IpgService } from '../modules/ipg/ipg.service';
import { CreateIpgDto } from '../modules/ipg/dtos/ipg/create-ipg.dto';
import { UpdateIpgDto } from '../modules/ipg/dtos/ipg/update-ipg.dto';
import { FilterIpgDto } from '../modules/ipg/dtos/ipg/filter-ipg.dto';
import { BankService } from '../modules/ipg/bank.service';
import { CreateBankDto } from '../modules/ipg/dtos/bank/create-bank.dto';
import { UpdateBankDto } from '../modules/ipg/dtos/bank/update-bank.dto';
import { FilterBankDto } from '../modules/ipg/dtos/bank/filter-bank.dto';
import { CountryService } from '../modules/ipg/country.service';
import { CreateCountryDto } from '../modules/ipg/dtos/country/create-country.dto';
import { UpdateCountryDto } from '../modules/ipg/dtos/country/update-country.dto';
import { FilterCountryDto } from '../modules/ipg/dtos/country/filter-country.dto';
import { CreateCountryBankDto } from '../modules/ipg/dtos/country/create-country-bank.dto';
import { CreateCountryBankRlCryptoDto } from '../modules/ipg/dtos/country/create-country-bank-rl-crypto.dto';
import { CreateCountryBankCryptoRlIpgDto } from '../modules/ipg/dtos/country/create-country-bank-crypto-rl-ipg.dto';
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateChainMongoMapper } from '../modules/chain/mapper/create-chain-mongo.mapper';
import { CreateCountryMongoMapper } from '../modules/ipg/mapper/country/create-country-mongo.mapper';
import { UpdateCountryMongoMapper } from '../modules/ipg/mapper/country/update-country-mongo.mapper';
import { GetCountryRMapper } from '../modules/ipg/rmapper/country/get-country-r.mapper';
import { PaginateCountryRMapper } from '../modules/ipg/rmapper/country/paginate-country-r.mapper';
import { CreateCountryBankMongoMapper } from '../modules/ipg/mapper/country/create-country-bank-mongo.mapper';
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

  @Post("/")
  @ApiCreatedObjectResponse(  PaginateCountryRMapper)
  createIpg(@Body() createCountryDto : CreateCountryDto) {
    return this.countryService.createCountry(createCountryDto)
  }

  @Put("/:countryId")
  @ApiOkObjectResponse(  PaginateCountryRMapper)
  updateCountry( @Param('countryId')  countryId : string ,@Body() updateCountryDto : UpdateCountryDto) {
    return this.countryService.updateCountry(countryId ,updateCountryDto)
  }

  @Get("/:countryId")
  @ApiOkObjectResponse(GetCountryRMapper)
  getCountry( @Param('countryId')  countryId : string ) {
    return this.countryService.getCountry(countryId )
  }

  @Delete("/:countryId")
  @ApiOkObjectResponse(DeleteResponseDto)
  deleteCountry( @Param('countryId')  countryId : string ) {
    return this.countryService.deleteCountry(countryId )
  }

  @Post("/pagination")
  @ApiOkObjectResponse(PaginateCountryRMapper)
  getPaginationCountry(@Body() filterCountryDto : FilterCountryDto) {
    return this.countryService.getPagination(filterCountryDto)
  }

  @Post("/bank/add")
  @ApiOkObjectResponse(PaginateCountryBankRMapper)
  addBankToCountry( @Body()  createCountryBankDto : CreateCountryBankDto )   {
    return this.countryService.addBankToCountry(createCountryBankDto )
  }

  @Delete("/bank/remove/:countryBankId")
  @ApiOkObjectResponse(DeleteResponseDto)
  removeBankToCountry( @Param('countryBankId')  countryBankId : string) {
    return this.countryService.removeBankToCountry(countryBankId )
  }

  @Post("/bank/paginate/:countryId")
  @ApiOkObjectResponse(PaginateCountryBankRMapper)
  getPaginationBankFromCountry(@Param('countryId') countryId:string,@Body() filterCountryBankDto : FilterCountryBankDto) {
    return this.countryService.getPaginationBankFromCountry(countryId ,filterCountryBankDto )
  }



  @Post("/bank/crypto/add")
  @ApiCreatedObjectResponse(PaginateCountryBankRlCrypto)
  addCryptoToCountryBank( @Body()  createCountryBankRlCryptoDto : CreateCountryBankRlCryptoDto ) {
    return this.countryService.addCryptoToCountryBank(createCountryBankRlCryptoDto )
  }

  @Delete("/bank/crypto/remove/:countryBankCryptoId")
  removeCryptoFromCountryBank( @Param('countryBankCryptoId')  countryBankCryptoId : string) {
    return this.countryService.removeCryptoFromCountryBank(countryBankCryptoId )
  }

  @Post("/bank/crypto/paginate/:countryBankId")
  @ApiCreatedObjectResponse(PaginateCountryBankRlCrypto)
  getPaginationCryptoFromCountryBank(@Param('countryId') countryBankId:string,@Body() filterCountryBankRlCryptoDto : FilterCountryBankRlCryptoDto) {
    return this.countryService.getPaginationCryptoFromCountryBank(countryBankId ,filterCountryBankRlCryptoDto )
  }

  @Post("/bank/crypto/ipg/add")
  @ApiCreatedObjectResponse(PaginateCountryBankCryptoRlIpgRMapper)
  addIpgToCountryBankCrypto( @Body()  createCountryBankCryptoRlIpgDto : CreateCountryBankCryptoRlIpgDto ) {
    return this.countryService.addIpgToCountryBankCrypto(createCountryBankCryptoRlIpgDto )
  }

  @Delete("/bank/crypto/ipg/remove/:countryBankCryptoIpgId")
  removeIpgFromCountryBankCrypto( @Param('countryBankCryptoIpgId')  countryBankCryptoIpgId : string) {
    return this.countryService.removeIpgFromCountryBankCrypto(countryBankCryptoIpgId )
  }

  @Post("/bank/crypto/paginate/:countryBankCryptoId")
  @ApiCreatedObjectResponse(PaginateCountryBankCryptoRlIpgRMapper)
  getPaginationIpgFromCountryBankCrypto(@Param('countryBankCryptoId') countryBankCryptoId:string,
                                        @Body() filterCountryBankCryptoRlIpgDto : FilterCountryBankCryptoRlIpgDto) {
    return this.countryService.getPaginationIpgFromCountryBankCrypto(countryBankCryptoId ,filterCountryBankCryptoRlIpgDto )
  }
}
