import { authConfig } from 'src/config/auth.config';
import { User } from 'src/modules/user/models/user.model';


export class LoginResponseDto {
    tokenType: string;
    expiresIn: number;
    accessToken: string;
    refreshToken?: string;
    user?: User;
}
