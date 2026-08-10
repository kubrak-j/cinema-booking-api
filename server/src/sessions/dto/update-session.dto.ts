import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto.js';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {}
