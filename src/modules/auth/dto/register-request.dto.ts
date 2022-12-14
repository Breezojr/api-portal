import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterRequestDto {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    
    email: string;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;
}
