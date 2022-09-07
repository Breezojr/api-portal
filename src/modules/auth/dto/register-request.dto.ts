import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterRequestDto {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
