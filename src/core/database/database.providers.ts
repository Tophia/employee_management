/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import {Employee} from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { Title } from '../../models/title.model';
import { Salary } from 'src/models/salary.model';
import { Department_Manager } from 'src/models/departmentManager';
import { Employee_Profile } from 'src/models/empolyeeProfile.model';
export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([
           Employee, 
           Department,
           Title,
           Salary,
           Department_Manager,
           Employee_Profile
            ]);
        await sequelize.sync();
        return sequelize;
    },
}]