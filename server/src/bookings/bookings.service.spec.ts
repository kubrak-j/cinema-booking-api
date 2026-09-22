import { describe, it, expect, vi } from 'vitest';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConfigService } from '@nestjs/config';

function createService(bookingInDb: unknown) {
  const prismaMock = {
    booking: {
      findUnique: vi.fn().mockResolvedValue(bookingInDb),
    },
  };
  const configMock = {};

  const service = new BookingsService(prismaMock as unknown as PrismaService, configMock as unknown as ConfigService);

  return { service, prismaMock };
}

describe('BookingsService.findOne', () => {
  it('returns the booking when it exists and belongs to the user', async () => {
    const fakeBooking = { id: 1, userId: 5, totalPrice: 100 };
    const { service } = createService(fakeBooking);

    const result = await service.findOne(1, 5);

    expect(result).toEqual(fakeBooking);
  });

  it('throws NotFoundException when the booking does not exist', async () => {
    const { service } = createService(null);

    await expect(service.findOne(999, 5)).rejects.toThrow(NotFoundException);
  });

  it('throws ForbiddenException when the booking belongs to another user', async () => {
    const fakeBooking = { id: 1, userId: 5, totalPrice: 100 };
    const { service } = createService(fakeBooking);

    await expect(service.findOne(1, 999)).rejects.toThrow(ForbiddenException);
  });
});
