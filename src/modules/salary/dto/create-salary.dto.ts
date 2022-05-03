/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSalaryDto {
    @IsNotEmpty()
    @ApiProperty()
    employee_id: bigint;
    @IsNotEmpty()
    @ApiProperty()
    amount:bigint;
    // @IsNotEmpty()
    // @ApiProperty()
    // from_date:Date;
    // @IsNotEmpty()
    // to_date:Date;
}