/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTitleDto } from '../dto/create-title.dto';
import { EMPLOYEE_REPOSITORY, TITLE_REPOSITORY } from 'src/core/constants';
import {Title} from '../../../models/title.model';
import { Employee } from 'src/models/employee.model';

@Injectable()
export class TitleService {
  constructor(
    // @InjectModel(Title)
    // private titleModel: typeof Title,
    @Inject(TITLE_REPOSITORY)
     private readonly titleRepository: typeof Title,
    //  private readonly employeeRepository: typeof Employee

    ) {}
  //   public async create(createTitleDto: CreateTitleDto): Promise<Title> {
  //     console.log("..employee..",createTitleDto);
  //     return this.titleRepository.create({
  //     title:createTitleDto.title,
  //     employee_id:createTitleDto.employee_id,
  //     from_date:createTitleDto.from_date,
  //     to_date:createTitleDto.to_date
  //   }
  //   );
  // }
  public async create(createTitleDto:CreateTitleDto): Promise<Title> {
    const findEmp = await this.titleRepository.findOne({ where:{employee_id:createTitleDto.employee_id}})
      // console.log("..createSalaryDto..",createSalaryDto);
      console.log("..findEmp..",findEmp);

    if(findEmp == null){
      console.log("..createSalaryDto..",createTitleDto);

      return this.titleRepository.create(
      {
        title:createTitleDto.title,
    employee_id:createTitleDto.employee_id,
  }
  );
}
else{
  const [numberOfAffectedRows, [updatedPost]] = await this.titleRepository.update({ ...createTitleDto }, { where: { employee_id : createTitleDto.employee_id }, returning: true });
  // await this.employeeRepository.update({ role :createTitleDto.title }, { where: { id : createTitleDto.employee_id }, returning: true });
  // return { numberOfAffectedRows, updatedPost };

}

}
  async findAll(): Promise<Title[]> {
    return this.titleRepository.findAll();
  }
  async update(employee_id) {
    return this.titleRepository.findOne({where:{employee_id : employee_id}});
  }
//   public async update(createTitleDto: CreateTitleDto): Promise<Title> {
//     console.log("..employee..",createTitleDto);
//     return this.titleRepository.update({
//     title:createTitleDto.title
//   },
//   {where:{employee_id: createTitleDto.employee_id}})
// }
}
