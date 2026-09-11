import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateHallDto } from './create-hall.dto.js';

export class UpdateHallDto extends PartialType(
    OmitType(CreateHallDto, ['layout'] as const)
) {}
