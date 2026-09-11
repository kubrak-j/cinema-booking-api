import crypto from 'crypto';

export function generateTicket(
    ticketSecret: string,
    sessionId: number,
    hallName: string,
    row: number,
    number: number,
): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let randomTail = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        randomTail += chars[randomIndex];
    }

    const baseInfo = `TKT-S${sessionId}-${hallName.toUpperCase()}-R${row}N${number}-${randomTail}`;

    const signature = crypto
        .createHmac('sha256', ticketSecret)
        .update(baseInfo)
        .digest('hex')
        .substring(0, 4)
        .toUpperCase();

    return `${baseInfo}-${signature}`;
}
