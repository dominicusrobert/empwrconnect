import { Body, Controller, Ip, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginRequest } from './dto/login.request';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post('login')
    async login(
        @Body() request: LoginRequest
    ): Promise<any> {
        const result = await this.userService.login(request);
        return result;
    }

}
