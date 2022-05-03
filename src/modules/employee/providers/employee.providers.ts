/* eslint-disable prettier/prettier */
import { Employee } from '../../../models/employee.model';
import { EMPLOYEE_REPOSITORY } from '../../../core/constants';

export const employeeProviders = [
    {
        provide: EMPLOYEE_REPOSITORY,
        useValue: Employee,
    },
];
