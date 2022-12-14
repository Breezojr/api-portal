import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AuthenticationError } from 'apollo-server-express';
import * as moment from 'moment';
import { authConfig } from 'src/config/auth.config';
import { User } from 'src/modules/user/models/user.model';
import { JwtPayload } from '../jwt-payload.interface';
import { AccessToken } from '../models/access-token.model';

@Injectable()
export class AccessTokenService {
    protected readonly logger = new Logger('AccessTokenService');

    constructor(protected readonly jwtService: JwtService) { }

    async validateAccessToken(tokenId: string): Promise<User> {
        if (!tokenId)
            throw new AuthenticationError(
                'Authentication error! No access token provided.',
            );

        const token = await AccessToken.findOne({
            where: {
                id: tokenId,
                isRevoked: false,
            },
        });

        if (!token)
            throw new AuthenticationError('Session expired! Please login.');

        // Retrieve user 
        const user = User.findOne({
            where: { id: token.userId }
        });

        if (!user)
            throw new AuthenticationError('Session expired! Please login.');

        return user;
    }

    async generateToken(user: User): Promise<string> {
        // Issue new token
        const token = new AccessToken();
        token.userId = user.id;
        token.expiresAt = moment()
            .add(authConfig.tokenLife, 'second')
            .toDate();
        await token.save();

        // create signed JWT
        const payload: JwtPayload = {
            jti: token.id,
            sub: `${token.userType}:${user.id}`,
        };

        const options: JwtSignOptions = {
            expiresIn: authConfig.tokenLife,
        };

        const accessToken: string = await this.jwtService.sign(
            payload,
            options,
        );

        // return signed JWT
        return accessToken;
    }
}
