/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
enum Gender {
    MALE = 'M',
    FEMALE = 'F',
  }
  export class UpdatedProfileDto {
    @IsNotEmpty()
    @ApiProperty()
      readonly employee_id: number;
    @ApiProperty()
      readonly first_name: string;
      @IsNotEmpty()
      @ApiProperty()
      readonly last_name: string;
      @IsNotEmpty()
      @ApiProperty(
        {
          default: '2019-03-01 00:00:00-06',
        }
      )
      readonly birth_date: Date;
      @IsNotEmpty()
      @ApiProperty(
        {
          default: '2019-03-01 00:00:00-06',
        }
      )
      readonly hire_date: Date;
      @IsNotEmpty()
      @ApiProperty()
      readonly email: string;
      @IsNotEmpty()
      @ApiProperty()
      readonly password: string;
      @IsNotEmpty()
      @ApiProperty({
        description: 'Female - F & Male - M',
        default: 'F',
      })
      readonly employee_gender: Gender;
  }