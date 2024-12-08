import { SpeedWithdraw } from '@app/common/dataBase/mongo/schemas/speed-withdraw.schema';
import { CreateSpeedWithdrawDto } from '../dtos/create-speed-withdraw.dto';


export class CreateSpeedWithdrawMongoMapper extends  SpeedWithdraw {


  constructor( createSpeedWithdrawDto : CreateSpeedWithdrawDto ) {
    super();
    this.slug = createSpeedWithdrawDto.slug
    this.description=createSpeedWithdrawDto.description

    this.status=createSpeedWithdrawDto.status
  }
}