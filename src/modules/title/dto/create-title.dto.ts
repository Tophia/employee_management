/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTitleDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;
    @IsNotEmpty()
    @ApiProperty()
    employee_id:bigint;
    // @IsNotEmpty()
    // from_date:Date;
    // @IsNotEmpty()
    // to_date:Date;
}