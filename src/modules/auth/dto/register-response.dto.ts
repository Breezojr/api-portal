import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterResponseDto {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;
}
