/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalaryServices } from './services/salary.service';
import { SalaryController } from './controllers/salary.controller';
import { salaryProviders } from './providers/salary.providers';
import { Salary } from 'src/models/salary.model';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SequelizeModule.forFeature([Salary]),PassportModule],
  controllers: [SalaryController],
  providers: [SalaryServices, ...salaryProviders],
})
export class SalaryModule {}
