import { Field } from "@nestjs/graphql";

export class UserInfoResponseDto{
    firstName: string;
    lastName: string;
    email: string;
}