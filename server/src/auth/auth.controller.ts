import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/auth-register.dto.js';
import { LoginUserDto } from './dto/auth-login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('register')
    register(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto);
    }
}
