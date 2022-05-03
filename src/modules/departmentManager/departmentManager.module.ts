/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentManagerController } from './controllers/departmentManager.controller';
import { Department_Manager } from '../../models/departmentManager';
import { DepartmentManagerService } from './services/departmentManager.service';
import { PassportModule } from '@nestjs/passport';
import {departmentManagerProviders} from './providers/departmentManager.providers'

@Module({
  imports: [SequelizeModule.forFeature([Department_Manager]),PassportModule],
  providers: [DepartmentManagerService, ...departmentManagerProviders ],
  controllers: [DepartmentManagerController],
})
export class DepartmentManagerModule {}
