import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/modules/user/providers/user.service';
import { User } from 'src/modules/user/models/user.model';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { Hash } from 'src/shared/helpers/hash.helper';
import { AccessToken } from './models/access-token.model';
import { AuthenticationError } from 'apollo-server-express';
import { Validator } from 'src/shared/helpers/validator.helper';
import { AccessTokenService } from './providers/access-token.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
    constructor(
        protected readonly userService: UserService,
        protected readonly accessTokenService: AccessTokenService,
    ) { }

    private readonly logger = new Logger('AuthService');

    async register(body: RegisterRequestDto): Promise<RegisterResponseDto> {
        return this.userService.register(body)
    }

    async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.validateUserCredentials(loginDto);

        const accessToken: string = await this.accessTokenService.generateToken(
            user,
        );

        const loginResponse = new LoginResponseDto();
        loginResponse.accessToken = accessToken;
        loginResponse.user = user;

        return loginResponse;
    }

    private async validateUserCredentials(
        loginDto: LoginRequestDto,
    ): Promise<User> {
        const { email, password } = loginDto;

        let user: User;

        // Find by Email
        if (Validator.isEmail(email)) {
            user = await User.findOne({where: { email: email }});
        }
      else {
            throw new AuthenticationError(
                'Invalid identifier provided! Identifier must be a VALID email or phone.',
            );
        }

        // invalid username
        if (!user) {
            this.logger.debug(`Invalid Username: ${email}`);
            throw new AuthenticationError('Invalid Credentials');
        }
        const verifyResult = await Hash.compare(password, user.password);

        // invalid password
        if (!verifyResult) {
            this.logger.debug(`Invalid Password for user: ${email}`);
            throw new AuthenticationError('Invalid Credentials');
        }

        return user;
    }


    async logout(user: User): Promise<boolean> {
        const result = await AccessToken.createQueryBuilder('access_token')
            .where('userId = :userId and userType = :userType', { userId: user.id, userType: 'user' })
            .update({ isRevoked: true })
            .execute();

        return result.affected > 0;
    }

}
