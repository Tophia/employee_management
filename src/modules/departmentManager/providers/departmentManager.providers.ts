/* eslint-disable prettier/prettier */
import { Department_Manager } from '../../../models/departmentManager';
import {DEPARTMENT_MANAGER_REPOSITORY} from '../../../core/constants/index';
export const departmentManagerProviders = [
    {
        provide: DEPARTMENT_MANAGER_REPOSITORY,

        useValue: Department_Manager,
    },
];
