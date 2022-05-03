/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly dept_name: string;
   
}