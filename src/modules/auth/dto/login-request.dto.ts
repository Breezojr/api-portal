import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginRequestDto {
    @Field()
    email: string;

    @Field()
    password: string;
}
