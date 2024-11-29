import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeIpgEnum } from '@app/common/enums/type-ipg.enum';
import { Allow, IsBoolean, IsString } from 'class-validator';
import { BankError } from '@elyasbr/tools-chain/dist/src';

export class CreateBankDto {
  @ApiProperty()
  @Allow()
  @IsString({
    message : JSON.stringify(BankError.SLUG_FIELD_BANK_IS_REQUIRED)
  })
  slug : string

  @ApiPropertyOptional()
  iconFileId : string

  @ApiProperty()
  @Allow()
  @IsBoolean({
    message : JSON.stringify(BankError.STATUS_FIELD_BANK_IS_REQUIRED)
  })
  status :Boolean
}