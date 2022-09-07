import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';

@Module({
    imports: [

    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
