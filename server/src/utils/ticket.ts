import crypto from 'crypto';
import { env } from '../config/env.js';

const TICKET_SECRET = env.TICKET_SECRET;

export function generateTicket(sessionId: number, seat: number){
    const baseInfo = `TKT-SESS${sessionId}-SEAT${seat}`;

    const hash = crypto
        .createHmac('sha256', TICKET_SECRET)
        .update(baseInfo)
        .digest('hex');

    const hashTail = hash.substring(0, 4);

    return `${baseInfo}-${hashTail}`;
}
