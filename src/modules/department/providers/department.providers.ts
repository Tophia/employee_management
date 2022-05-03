/* eslint-disable prettier/prettier */
import { Department } from '../../../models/department.model';
import {DEPARTMENT_REPOSITORY} from '../../../core/constants/index';
export const departmentProviders = [
    {
        provide: DEPARTMENT_REPOSITORY,

        useValue: Department,
    },
];
