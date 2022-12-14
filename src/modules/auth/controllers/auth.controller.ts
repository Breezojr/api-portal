import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserInfoResponseDto } from "src/modules/user/dto/user-info-response.dto";
import { User } from "src/modules/user/models/user.model";
import { UserService } from "src/modules/user/providers/user.service";
import { CurrentUser } from "../auth-user.decorator";
import { JwtAuthGuard } from "../auth.guard";
import { AuthService } from "../auth.service";
import { LoginRequestDto } from "../dto/login-request.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { RegisterRequestDto } from "../dto/register-request.dto";
import { RegisterResponseDto } from "../dto/register-response.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Post('register')
    async register(@Body() body: RegisterRequestDto): Promise<RegisterResponseDto> {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authService.login(body);
    } 

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@CurrentUser() user: User) {
        return this.authService.logout(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('user-profile')
    async getUserProfile(@CurrentUser() user: User): Promise<UserInfoResponseDto> {
        return this.userService.getUserProfile(user);
    }
}