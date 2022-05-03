/* eslint-disable prettier/prettier */
import { Salary } from '../../../models/salary.model';
import { SALARY_REPOSITORY } from '../../../core/constants';

export const salaryProviders = [
    {
        provide: SALARY_REPOSITORY,
        useValue: Salary,
    },
];
