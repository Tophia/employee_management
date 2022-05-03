/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { DepartmentModel } from '../../../models/department.model';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { DEPARTMENT_REPOSITORY } from 'src/core/constants';
import {Department} from '../../../models/department.model'
@Injectable()
export class DepartmentService {
  constructor(
    // @InjectModel(Department)
    // private departmentModel: typeof Department,
    @Inject(DEPARTMENT_REPOSITORY) 
    private readonly departmentRepository: typeof Department
    ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.findAll();
  }

  findOne(id: string): Promise<Department> {
    return this.departmentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createDepartment(department:CreateDepartmentDto): Promise<Department> {
    console.log("...dept..",department);
    
    return this.departmentRepository.create({
      dept_name: department.dept_name
    });
  }
async update(department_id, department) {
  const [numberOfAffectedRows, [updatedPost]] = await this.departmentRepository.update({ ...department }, { where: { id : department_id }, returning: true });

  return { numberOfAffectedRows, updatedPost };
}
async delete(id) {
  return await this.departmentRepository.update(
   { deleted : 1},
    { where: { id } });
}
}
