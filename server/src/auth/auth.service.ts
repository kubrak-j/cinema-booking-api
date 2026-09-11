import { ConflictException, UnauthorizedException, Injectable } from '@nestjs/common'
import { UsersService } from "../users/users.service.js";
import { RegisterUserDto } from './dto/auth-register.dto.js';
import { LoginUserDto } from './dto/auth-login.dto.js';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterUserDto) {
        const user = await this.usersService.findByEmailOrLogin(dto.email, dto.login);

        if (user) {
            if (user.email === dto.email) {
                throw new ConflictException('Email is already registered');
            }
            throw new ConflictException('Login is already taken');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = await this.usersService.create({ ...dto, password: hashedPassword });

        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async login(dto: LoginUserDto) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const passwordMatches = await bcrypt.compare(dto.password, user.password);

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { sub: user.id, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken };
    }
}
