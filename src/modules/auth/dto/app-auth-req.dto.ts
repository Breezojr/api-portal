import { IsNotEmpty } from "class-validator";

export class AppAuthRequestDto {
    @IsNotEmpty()
    clientID: string;

    @IsNotEmpty()
    clientSecret: string;

    @IsNotEmpty()
    grantType: string;
}