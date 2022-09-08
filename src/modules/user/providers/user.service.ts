import {
  BadRequestException,
  Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { RegisterRequestDto } from 'src/modules/auth/dto/register-request.dto';
import { RegisterResponseDto } from 'src/modules/auth/dto/register-response.dto';
import { UserInfoResponseDto } from '../dto/user-info-response.dto';
import { User } from '../models/user.model';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  async register(body: RegisterRequestDto): Promise<RegisterResponseDto> {
    const userFound = await User.findOne({
      where:
        { email: body.email }
    })

    if (userFound) {
      throw new BadRequestException(`user with email ${body.email} has already been register, sign in`)
    }

    try {
      const user = new User()
      user.firstName = body.firstName
      user.lastName = body.lastName
      user.email = body.email
      user.password = body.password

      await user.save()

      const response = new RegisterResponseDto
      response.firstName = user.firstName
      response.lastName = user.lastName
      response.email = user.email

      return response
    } catch (err) {
      throw new BadRequestException('Process Fail Internally')
    }
  }

  async getUserProfile(user: User): Promise<UserInfoResponseDto> {
    try {
      const userInfo = await User.findOne({
        where: {
          id: user.id
        }
      })
      if (!userInfo) {
        throw new NotFoundException(' User was not found')
      }

      const response = new UserInfoResponseDto()
      response.firstName = user.firstName
      response.lastName = user.lastName
      response.email = user.email
      return response
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
