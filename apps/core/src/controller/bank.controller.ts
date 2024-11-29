import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateAssetMongoMapper } from '../modules/asset/mapper/asset/create-asset-mongo.mapper';
import { CreateBankMongoMapper } from '../modules/ipg/mapper/bank/create-bank-mongo.mapper';
import { UpdateBankMongoMapper } from '../modules/ipg/mapper/bank/update-bank-mongo.mapper';
import { GetBankRMapper } from '../modules/ipg/rmapper/bank/get-bank-r.mapper';
import { PaginateBankRMapper } from '../modules/ipg/rmapper/bank/paginate-bank-r.mapper';

@Controller({
  path : "blockchain/bank" ,
  version : "1"
})
@ApiTags("Bank")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post("/")
  @ApiCreatedObjectResponse(PaginateBankRMapper)

  createBank(@Body() createBankDto : CreateBankDto) {
    return this.bankService.createBank(createBankDto)
  }

  @Put("/:bankId")
  @ApiOkObjectResponse(PaginateBankRMapper)
  updateBank( @Param('bankId')  bankId : string ,@Body() updateBankDto : UpdateBankDto) {
    return this.bankService.updateBank(bankId ,updateBankDto)
  }

  @Get("/:bankId")
  @ApiOkObjectResponse(GetBankRMapper)
  getBank( @Param('bankId')  bankId : string ) {
    return this.bankService.getBank(bankId )
  }

  @Delete("/:bankId")
  @ApiOkObjectResponse(DeleteResponseDto)
  @ApiOperation({deprecated :false , summary : "Delete Bank" })
  deleteBank( @Param('bankId')  bankId : string ) {
    return this.bankService.deleteBank(bankId )
  }

  @Post("/pagination")
  @ApiCreatedObjectResponse(PaginateBankRMapper)
  @ApiOperation({deprecated :false , summary : "Pagination Bank" })
  getPagination(@Body() filterBankDto : FilterBankDto) {
    return this.bankService.getPagination(filterBankDto)
  }

}
