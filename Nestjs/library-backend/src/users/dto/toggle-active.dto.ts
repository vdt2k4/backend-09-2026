import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class ToggleActiveDto {
    @IsNotEmpty()
    isActive: boolean;
}
