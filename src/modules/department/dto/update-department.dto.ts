import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateEmployeeDto extends PartialType(CreateDepartmentDto) {}
