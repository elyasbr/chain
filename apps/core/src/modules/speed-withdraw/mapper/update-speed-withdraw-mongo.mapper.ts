import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { CreateSpeedWithdrawDto } from '../dtos/create-speed-withdraw.dto';
import { UpdateSpeedWithdrawDto } from '../dtos/update-speed-withdraw.dto';


export class UpdateSpeedWithdrawMongoMapper extends  SpeedWithdraw {


  constructor( updateSpeedWithdrawDto : UpdateSpeedWithdrawDto ) {
    super();
    this.slug = updateSpeedWithdrawDto.slug
    this.description=updateSpeedWithdrawDto.description

    this.status=updateSpeedWithdrawDto.status
  }
}