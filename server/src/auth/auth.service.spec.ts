import { describe, it, expect, vi } from 'vitest';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import type { RegisterUserDto } from './dto/auth-register.dto.js';

const { hashMock, compareMock } = vi.hoisted(() => ({
  hashMock: vi.fn().mockResolvedValue('hashed-password'),
  compareMock: vi.fn().mockResolvedValue(true),
}));

vi.mock('bcrypt', () => ({
  default: {
    hash: hashMock,
    compare: compareMock,
  },
}));

function createService(overrides: { existingUser?: unknown; foundUserForLogin?: unknown; createdUser?: unknown }) {
  const usersServiceMock = {
    findByEmailOrLogin: vi.fn().mockResolvedValue(overrides.existingUser ?? null),
    findByEmail: vi.fn().mockResolvedValue(overrides.foundUserForLogin ?? null),
    create: vi.fn().mockResolvedValue(overrides.createdUser ?? {}),
  };

  const jwtServiceMock = {
    signAsync: vi.fn().mockResolvedValue('FAKE-JWT-TOKEN'),
  };

  const service = new AuthService(usersServiceMock as unknown as UsersService, jwtServiceMock as unknown as JwtService);

  return { service, usersServiceMock, jwtServiceMock };
}

describe('AuthService.register', () => {
  it('throws ConflictException("Email is already registered") when the email is taken', async () => {
    const { service } = createService({
      existingUser: { id: 1, email: 'taken@test.com', login: 'someone-else' },
    });

    await expect(
      service.register({ email: 'taken@test.com', login: 'new-login', password: 'pass' } as unknown as RegisterUserDto),
    ).rejects.toThrow(new ConflictException('Email is already registered'));
  });

  it('throws ConflictException("Login is already taken") when only the login is taken', async () => {
    const { service } = createService({
      existingUser: { id: 1, email: 'someone-else@test.com', login: 'taken-login' },
    });

    await expect(
      service.register({ email: 'new@test.com', login: 'taken-login', password: 'pass' } as unknown as RegisterUserDto),
    ).rejects.toThrow(new ConflictException('Login is already taken'));
  });

  it('hashes the password and strips it from the returned user', async () => {
    const { service, usersServiceMock } = createService({
      existingUser: null,
      createdUser: { id: 1, email: 'new@test.com', login: 'new-login', password: 'hashed-password' },
    });

    const result = await service.register({
      email: 'new@test.com',
      login: 'new-login',
      password: 'plain-password',
    } as unknown as RegisterUserDto);

    expect(hashMock).toHaveBeenCalledWith('plain-password', 10);
    expect(usersServiceMock.create).toHaveBeenCalledWith(expect.objectContaining({ password: 'hashed-password' }));
    expect(result).not.toHaveProperty('password');
  });
});

describe('AuthService.login', () => {
  it('throws UnauthorizedException when no user matches the email', async () => {
    const { service } = createService({ foundUserForLogin: null });

    await expect(service.login({ email: 'missing@test.com', password: 'pass' })).rejects.toThrow(UnauthorizedException);
  });

  it('throws UnauthorizedException when the password does not match', async () => {
    const { service } = createService({
      foundUserForLogin: { id: 1, email: 'user@test.com', password: 'hashed-password', role: 'USER' },
    });
    compareMock.mockResolvedValueOnce(false);

    await expect(service.login({ email: 'user@test.com', password: 'wrong-password' })).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('returns an access token when the credentials are valid', async () => {
    const { service, jwtServiceMock } = createService({
      foundUserForLogin: { id: 1, email: 'user@test.com', password: 'hashed-password', role: 'USER' },
    });

    const result = await service.login({ email: 'user@test.com', password: 'correct-password' });

    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({ sub: 1, role: 'USER' });
    expect(result).toEqual({ accessToken: 'FAKE-JWT-TOKEN' });
  });
});
