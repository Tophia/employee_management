/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileService } from './services/profile.service';
import { profileProviders } from './providers/profile.providers';
// import { Department } from 'src/models/department.model';
import { ProfileController } from './controllers/profile.controller';
import { PassportModule } from '@nestjs/passport';
import { Employee_Profile } from 'src/models/empolyeeProfile.model';
import { EmployeeModule } from '../employee/employee.module';
@Module({
    imports: [
        SequelizeModule.forFeature([Employee_Profile]),
        PassportModule,
        EmployeeModule
    ],
    providers: [ProfileService, ...profileProviders],
    exports: [ProfileService],
    controllers: [ProfileController]
})
export class ProfileModule {}