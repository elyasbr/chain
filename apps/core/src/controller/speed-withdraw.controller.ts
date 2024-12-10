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

@Controller({
  path : "blockchain/speed-withdraw" ,
  version : "1"
})
@ApiTags("Speed Withdraw")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class SpeedWithdrawController {
  constructor(private readonly speedWithdrawService: SpeedWithdrawService) {}

  @Post("/")
  @ApiOperation({ summary: 'Create SpeedWithdraw'  })
  @ApiCreatedObjectResponse(  PaginateSpeedWithdrawRMapper)
  createStruct(@Body() createSpeedWithdrawDto : CreateSpeedWithdrawDto) {
    console.log(createSpeedWithdrawDto);
    return this.speedWithdrawService.createSpeedWithdraw(createSpeedWithdrawDto)
  }
  @Put("/:speedWithdrawId")
  @ApiOperation({ summary: 'Update SpeedWithdraw'  })
  @ApiCreatedObjectResponse(  PaginateSpeedWithdrawRMapper)
  updateSpeedWithdraw( @Param('speedWithdrawId')  speedWithdrawId : string ,@Body() updateSpeedWithdrawDto : UpdateSpeedWithdrawDto) {
    return this.speedWithdrawService.updateSpeedWithdraw(speedWithdrawId ,updateSpeedWithdrawDto)
  }

  @Get("/:speedWithdrawId")
  @ApiOperation({ summary: 'Get SpeedWithdraw'  })
  @ApiCreatedObjectResponse(  GetSpeedWithdrawRMapper)
  getStruct( @Param('speedWithdrawId')  speedWithdrawId : string ) {

    return this.speedWithdrawService.getSpeedWithdraw(speedWithdrawId )
  }

  @Delete("/:speedWithdrawId")
  @ApiOperation({ summary: 'Delete SpeedWithdraw'  })
  @ApiCreatedArrayResponse(  DeleteResponseDto)
  deleteStruct( @Param('speedWithdrawId')  speedWithdrawId : string ) {
    return this.speedWithdrawService.deleteSpeedWithdraw(speedWithdrawId )
  }

  @Post("/pagination")
  @ApiOperation({ summary: 'Pagination SpeedWithdraw'  })
  @ApiCreatedArrayResponse( PaginateSpeedWithdrawRMapper)
  getPagination(@Body() filterSpeedWithdrawDto : FilterSpeedWithdrawDto) {
    return this.speedWithdrawService.getPagination(filterSpeedWithdrawDto)
  }

}
