/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSalaryDto } from '../dto/create-salary.dto';
import { SALARY_REPOSITORY } from 'src/core/constants';
import {Salary} from '../../../models/salary.model';
import { userInfo } from 'os';

@Injectable()
export class SalaryServices {
  constructor(
    // @InjectModel(Title)
    // private titleModel: typeof Title,
    @Inject(SALARY_REPOSITORY)
     private readonly salaryRepository: typeof Salary
    ) {}
    public async createOrUpdate(salaryUpdation:CreateSalaryDto): Promise<Salary> {
      console.log("..salaryUpdation..",salaryUpdation);

      const findEmp = await this.salaryRepository.findOne({ where:{employee_id:salaryUpdation.employee_id}})
        // console.log("..createSalaryDto..",createSalaryDto);
        console.log("..findEmp..",findEmp);

      if(findEmp == null){
        console.log("..createSalaryDto..",salaryUpdation);

        return this.salaryRepository.create(
        {
        amount:salaryUpdation.amount,
      employee_id:salaryUpdation.employee_id,
      // from_date:salaryUpdation.from_date,
      // to_date:salaryUpdation.to_date
    }
    );
  }
  else{
    const [numberOfAffectedRows, [updatedPost]] = await this.salaryRepository.update({ ...salaryUpdation }, { where: { employee_id : salaryUpdation.employee_id }, returning: true });
    // return { numberOfAffectedRows, updatedPost };

  }
  
  }
  async findAll(): Promise<Salary[]> {
    return this.salaryRepository.findAll();
  }

  async fetchSal(time_period: number,employeeID:number): Promise<number> {
    const findSal = await this.salaryRepository.findOne({
      where: {
        employee_id : employeeID ,
      },
      attributes:['amount']      
    });
    console.log("findSal",findSal);
const totalSal = (findSal.amount * time_period);
console.log("totalll sal",totalSal);

return totalSal;
  }
  // async update(employee_id, title) {
  //   const [numberOfAffectedRows, [updatedPost]] = await this.salaryRepository.update({ ...title }, { where: { employee_id : employee_id }, returning: true });
  // }
}