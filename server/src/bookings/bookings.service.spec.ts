import { describe, it, expect, vi } from 'vitest';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConfigService } from '@nestjs/config';

vi.mock('../utils/ticket.js', () => ({
  generateTicket: vi.fn().mockReturnValue('FAKE-TICKET-CODE'),
}));

vi.mock('../utils/pricing.js', () => ({
  priceCalculate: vi.fn().mockReturnValue(150),
}));

function createService(overrides: { booking?: unknown; session?: unknown; seat?: unknown; createdBooking?: unknown }) {
  const prismaMock = {
    booking: {
      findUnique: vi.fn().mockResolvedValue(overrides.booking ?? null),
      create: vi.fn().mockResolvedValue(overrides.createdBooking ?? {}),
    },
    session: {
      findUnique: vi.fn().mockResolvedValue(overrides.session ?? null),
    },
    seat: {
      findUnique: vi.fn().mockResolvedValue(overrides.seat ?? null),
    },
  };

  const configMock = {
    getOrThrow: vi.fn().mockReturnValue('test-ticket-secret'),
  };

  const service = new BookingsService(prismaMock as unknown as PrismaService, configMock as unknown as ConfigService);

  return { service, prismaMock };
}

describe('BookingsService.findOne', () => {
  it('returns the booking when it exists and belongs to the user', async () => {
    const fakeBooking = { id: 1, userId: 5, totalPrice: 100 };
    const { service } = createService({ booking: fakeBooking });

    const result = await service.findOne(1, 5);

    expect(result).toEqual(fakeBooking);
  });

  it('throws NotFoundException when the booking does not exist', async () => {
    const { service } = createService({ booking: null });

    await expect(service.findOne(999, 5)).rejects.toThrow(NotFoundException);
  });

  it('throws ForbiddenException when the booking belongs to another user', async () => {
    const fakeBooking = { id: 1, userId: 5, totalPrice: 100 };
    const { service } = createService({ booking: fakeBooking });

    await expect(service.findOne(1, 999)).rejects.toThrow(ForbiddenException);
  });
});

describe('BookingsService.create', () => {
  it('throws NotFoundException when the session does not exist', async () => {
    const { service } = createService({ session: null });

    await expect(service.create({ sessionId: 1, seatId: 1 }, 5)).rejects.toThrow(NotFoundException);
  });

  it('throws NotFoundException when the seat does not exist', async () => {
    const { service } = createService({
      session: { id: 1, hallId: 10, basePrice: { toNumber: () => 20 } },
      seat: null,
    });

    await expect(service.create({ sessionId: 1, seatId: 1 }, 5)).rejects.toThrow(NotFoundException);
  });

  it('throws BadRequestException when the seat belongs to a different hall than the session', async () => {
    const { service } = createService({
      session: { id: 1, hallId: 10, basePrice: { toNumber: () => 20 } },
      seat: { id: 1, hallId: 999, row: 'A', number: 1, seatCategory: 'STANDARD' },
    });

    await expect(service.create({ sessionId: 1, seatId: 1 }, 5)).rejects.toThrow(BadRequestException);
  });

  it('creates a booking when the seat belongs to the session hall', async () => {
    const { service, prismaMock } = createService({
      session: {
        id: 1,
        hallId: 10,
        hall: { name: 'Red Hall' },
        basePrice: { toNumber: () => 20 },
      },
      seat: { id: 1, hallId: 10, row: 'A', number: 1, seatCategory: 'STANDARD' },
      createdBooking: { id: 1, ticketCode: 'FAKE-TICKET-CODE', totalPrice: 150 },
    });

    const result = await service.create({ sessionId: 1, seatId: 1 }, 5);

    expect(result).toEqual({ id: 1, ticketCode: 'FAKE-TICKET-CODE', totalPrice: 150 });
    expect(prismaMock.booking.create).toHaveBeenCalledWith({
      data: {
        ticketCode: 'FAKE-TICKET-CODE',
        totalPrice: 150,
        userId: 5,
        sessionId: 1,
        seatId: 1,
      },
    });
  });
});
