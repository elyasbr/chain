import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { ApiValidationRequest } from '@elyasbr/public/dist/src/decorators/api-validation-request.decorator';
import { ApiForbiddenRequest } from '@elyasbr/public/dist/src/decorators/api-forbidden-request.decorator';
import { CreateAssetMongoMapper } from '../modules/asset/mapper/asset/create-asset-mongo.mapper';
import { UpdateAssetMongoMapper } from '../modules/asset/mapper/asset/update-asset-mongo.mapper';
import { PaginateAssetRMapper } from '../modules/asset/rmapper/asset/paginate-asset-r.mapper';
import { GetAssetRMapper } from '../modules/asset/rmapper/asset/get-asset-r.mapper';
import { GroupAssetEnum } from '@app/common/enums/group-asset.enum';

@Controller({
  path : "blockchain/asset" ,
  version : "1"
})
@ApiTags("Asset")
@ApiValidationRequest()
@ApiForbiddenRequest()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post("/")
  @ApiOperation({summary : "Create Asset"})
  @ApiCreatedObjectResponse(PaginateAssetRMapper)
  createAsset(@Body() createAssetDto : CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto)
  }

  @Put("/:assetId")
  @ApiOperation({summary : "Update Asset"})
  @ApiOkObjectResponse(PaginateAssetRMapper)
  updateAsset( @Param('assetId')  assetId : string ,@Body() updateAssetDto : UpdateAssetDto) {
    return this.assetService.updateAsset(assetId ,updateAssetDto)
  }
  @Get("/asset-group")
  @ApiOperation({summary : "Get Group Asset"})
  @ApiOkObjectResponse(GroupAssetEnum)
  getGroupAsset(  ) {
    return this.assetService.getGroupAssetCoin( )
  }
  @Get("/:assetId")
  @ApiOperation({summary : "Get Asset"})
  @ApiOkObjectResponse(GetAssetRMapper)
  getAsset( @Param('assetId')  assetId : string ) {
    return this.assetService.getAsset(assetId )
  }

  @Delete("/:assetId")
  @ApiOperation({summary : "Delete Asset"})
  @ApiOkObjectResponse(  DeleteResponseDto)
  deleteAsset( @Param('assetId')  assetId : string ) {
    return this.assetService.deleteAsset(assetId )
  }

  @Post("/pagination")
  @ApiOperation({summary : "Pagination Asset"})
  @ApiOkObjectResponse(  PaginateAssetRMapper)
  getPagination(@Body() filterAssetDto : FilterAssetDto) {
    return this.assetService.getPagination(filterAssetDto)
  }
}
