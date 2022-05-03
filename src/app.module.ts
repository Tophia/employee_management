/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './core/database/database.config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { SalaryModule } from './modules/salary/salary.module';
import { TitleModule } from './modules/title/title.module';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import { DepartmentManagerModule } from './modules/departmentManager/departmentManager.module';
import { ProfileModule } from './modules/profile/profile.module';
@Module({
    imports: [
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'filter',
        autoLoadModels: true,
        synchronize: true,
      }),
        // SequelizeModule.forRoot({}),
        // ConfigModule.forRoot({ isGlobal: true }),
        //////----//isGlobal: true will make the .env properties available throughout the application.
        DatabaseModule,
        AuthModule,
        DepartmentModule,
        TitleModule,
        SalaryModule,
        EmployeeModule,
        GraphQlModule,
        DepartmentManagerModule,
        ProfileModule
      ]
})
export class AppModule { }
