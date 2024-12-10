import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { StructService } from '../modules/struct/struct.service';
import { CreateStructDto } from '../modules/struct/dtos/create-struct.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { SpeedWithdrawService } from '../modules/withdraw/speed-withdraw.service';
import { PaginateSpeedWithdrawRMapper } from '../modules/withdraw/rmapper/speed-withdraw/paginate-speed-withdraw-r.mapper';
import { CreateSpeedWithdrawDto } from '../modules/withdraw/dtos/speed-withdraw/create-speed-withdraw.dto';
import { UpdateSpeedWithdrawDto } from '../modules/withdraw/dtos/speed-withdraw/update-speed-withdraw.dto';
import { GetSpeedWithdrawRMapper } from '../modules/withdraw/rmapper/speed-withdraw/get-speed-withdraw-r.mapper';
import { FilterSpeedWithdrawDto } from '../modules/withdraw/dtos/speed-withdraw/filter-speed-withdraw.dto';
import { WithdrawCryptoService } from '../modules/withdraw/withdraw-crypto.service';
import { CreateWithdrawCryptoDto } from '../modules/withdraw/dtos/withdraw-crypto/create-withdraw-crypto.dto';
import { FilterWithdrawCryptoDto } from '../modules/withdraw/dtos/withdraw-crypto/filter-withdraw-crypto.dto';
import { FeeWithdrawService } from '../modules/withdraw/fee-withdraw.service';
import { PaginateFeeWithdrawRMapper } from '../modules/withdraw/rmapper/fee-withdraw/paginate-fee-withdraw-r.mapper';
import { CreateFeeWithdrawDto } from '../modules/withdraw/dtos/fee-withdraw/create-fee-withdraw.dto';
import { FilterFeeWithdrawDto } from '../modules/withdraw/dtos/fee-withdraw/filter-fee-withdraw.dto';
import { ChangeFeeWithdrawDto } from '../modules/withdraw/dtos/fee-withdraw/change-fee-withdraw.dto';

@Controller({
  path : "blockchain/fee-withdraw" ,
  version : "1"
})
@ApiTags("Fee Withdraw ")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class FeeWithdrawController {
  constructor(private readonly feeWithdrawService: FeeWithdrawService) {}

  @Post("/")
  @ApiOperation({ summary: 'Create Fee Withdraw'  })
  @ApiCreatedObjectResponse(  PaginateFeeWithdrawRMapper)
  createWithdraw(@Body() createFeeWithdrawDto : CreateFeeWithdrawDto) {
    return this.feeWithdrawService.createFeeWithdraw(createFeeWithdrawDto)
  }
  @Post("/pagination/:withdrawCryptoId")
  @ApiOperation({ summary: 'Pagination Fee Withdraw'  })
  @ApiCreatedArrayResponse( PaginateFeeWithdrawRMapper)
  getPagination(@Param('withdrawCryptoId') withdrawCryptoId : string ,@Body() filterFeeWithdrawDto : FilterFeeWithdrawDto) {
    return this.feeWithdrawService.getPagination(withdrawCryptoId , filterFeeWithdrawDto)
  }
  @Patch("/status/:feeWithdrawId")
  @ApiOperation({ summary: 'change Status Fee Withdraw'  })
  @ApiCreatedObjectResponse(  PaginateFeeWithdrawRMapper)
  changeStatusFeeWithdraw(@Param('feeWithdrawId') feeWithdrawId: string ,@Body() changeFeeWithdrawDto : ChangeFeeWithdrawDto) {
    return this.feeWithdrawService.changeStatusFeeWithdraw(feeWithdrawId ,changeFeeWithdrawDto)
  }




}
