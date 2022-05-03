/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentController } from './controllers/department.controller';
import { Department } from '../../models/department.model';
import { DepartmentService } from './services/department.services';
import { PassportModule } from '@nestjs/passport';
import {departmentProviders} from './providers/department.providers'

@Module({
  imports: [SequelizeModule.forFeature([Department]),PassportModule],
  providers: [DepartmentService, ...departmentProviders ],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
