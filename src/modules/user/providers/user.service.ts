import {
    Injectable, NotFoundException,
} from '@nestjs/common';
import { User } from '../models/user.model';


@Injectable()
export class UserService {
  async getUserProfile(user: User){
    const userInfo = await User.findOne({where: {
        id: user.id
    }})
    if(!userInfo){
        throw new NotFoundException(' User was not found')
    }

    const { password, ...result} = userInfo
    return result
  }
}
