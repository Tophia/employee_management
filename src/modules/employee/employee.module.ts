/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeService } from './services/employee.service';
import { employeeProviders } from './providers/employee.providers';
// import { Department } from 'src/models/department.model';
import { EmployeeController } from './controllers/employee.controller';
import { Employee } from 'src/models/employee.model';
import { PassportModule } from '@nestjs/passport';
@Module({
    imports: [SequelizeModule.forFeature([Employee]),PassportModule],
    providers: [EmployeeService, ...employeeProviders],
    exports: [EmployeeService],
    controllers: [EmployeeController]
})
export class EmployeeModule {}

// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './user.entity';

// @Module({
//   imports: [SequelizeModule.forFeature([User])],
//   exports: [SequelizeModule]
// })
// export class UsersModule {}