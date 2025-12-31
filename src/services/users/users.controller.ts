import { Body, Controller, Ip, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginRequest } from './dto/login.request';
import { SignupRequest } from './dto/signup.request';
import { LoginResponse } from './dto/login.response';
import { BaseResponse } from 'src/base/base.response';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
    ) {}

    @Post('signup')
    async signup(
        @Body() request: SignupRequest
    ): Promise<BaseResponse<any>> {
        const result = await this.userService.signup(request);
		return BaseResponse.successResponse(result, 'SignUp Success');
    }

    @Post('login')
    async login(
        @Body() request: LoginRequest
    ): Promise<BaseResponse<LoginResponse>> {
        const result = await this.userService.login(request);
		return BaseResponse.successResponse(result, 'Login Success');
    }

}
