/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDepartmentManagerDto } from '../dto/create-departmentManager.dto';
import { DEPARTMENT_MANAGER_REPOSITORY } from 'src/core/constants';
import {Department_Manager} from '../../../models/departmentManager';
@Injectable()
export class DepartmentManagerService {
  constructor(
    // @InjectModel(Department)
    // private departmentModel: typeof Department,
    @Inject(DEPARTMENT_MANAGER_REPOSITORY) 
    private readonly departmentManagerRepository: typeof Department_Manager
    ) {}

  async findAll(): Promise<Department_Manager[]> {
    return this.departmentManagerRepository.findAll({where:{
      deleted : false
    }});
  }

  findOne(id: string): Promise<Department_Manager> {
    return this.departmentManagerRepository.findOne({
      where: {
        id,
      },
    });
  }
async delete(id) {
  return await this.departmentManagerRepository.update(
   { deleted : 1},
    { where: { id } });
}
public async createOrUpdate(managerUpdation:CreateDepartmentManagerDto): Promise<Department_Manager> {
    console.log("..managerUpdation..",managerUpdation);

    const findDept = await this.departmentManagerRepository.findOne({ where:{department_id:managerUpdation.department_id}})
      // console.log("..createSalaryDto..",createSalaryDto);
      console.log("..findEmp..",findDept);

    if(findDept == null){
      console.log("..managerUpdation..",managerUpdation);

      return this.departmentManagerRepository.create(
      {
        department_id:managerUpdation.department_id,
      employee_id:managerUpdation.employee_id,
    // from_date:salaryUpdation.from_date,
    // to_date:salaryUpdation.to_date
  }
  );
}
else{
  const [numberOfAffectedRows, [updatedPost]] = await this.departmentManagerRepository.update({ ...managerUpdation }, { where: { department_id : managerUpdation.department_id }, returning: true });
  // return { numberOfAffectedRows, updatedPost };

}

}
//   async createDepartment(department:CreateDepartmentManagerDto): Promise<Department> {
//     console.log("...dept..",department);
    
//     return this.departmentRepository.create({
//       dept_name: department.dept_name
//     });
//   }
// async update(department_id, department) {
//   const [numberOfAffectedRows, [updatedPost]] = await this.departmentRepository.update({ ...department }, { where: { id : department_id }, returning: true });

//   return { numberOfAffectedRows, updatedPost };
// }
}
