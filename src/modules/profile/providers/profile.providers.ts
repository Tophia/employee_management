/* eslint-disable prettier/prettier */
import { Employee_Profile } from '../../../models/empolyeeProfile.model';
import { EMPLOYEE_PROFILE_REPOSITORY } from '../../../core/constants';

export const profileProviders = [
    {
        provide: EMPLOYEE_PROFILE_REPOSITORY,
        useValue: Employee_Profile,
    },
];
