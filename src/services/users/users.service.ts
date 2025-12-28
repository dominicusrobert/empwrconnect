import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';

@Injectable()
export class UsersService {
    constructor(
    ) {

    }

    async login(payload: LoginRequest): Promise<LoginResponse> {

        return new LoginResponse();
    }
}
