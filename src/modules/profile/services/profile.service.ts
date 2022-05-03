/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Employee_Profile } from '../../../models/empolyeeProfile.model';
import { UpdatedProfileDto } from '../dto/update-profile.dto';
import { EMPLOYEE_PROFILE_REPOSITORY } from '../../../core/constants/index';
import { Salary } from 'src/models/salary.model';
import { Title } from 'src/models/title.model';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from 'src/modules/employee/services/employee.service';

@Injectable()
export class ProfileService {

    constructor(
        private readonly employeeService: EmployeeService,
        @Inject(EMPLOYEE_PROFILE_REPOSITORY) private readonly employeeProfileRepository: typeof Employee_Profile,) { }

    async updateProfile(user: UpdatedProfileDto): Promise<Employee_Profile> {
        if(user.password !=null){
        const pass = await this.hashPassword(user.password);
        }
        const newUser = await this.employeeProfileRepository.create(user);
        const { password, ...result } = newUser['dataValues'];

        return result
        // return await this.employeeProfileRepository.create<Employee_Profile>(user);
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async getProfile(): Promise<Employee_Profile[]> {
        return await this.employeeProfileRepository.findAll(
            { where: { confirmed :false }}
        )
        //     include: [{
        //         model: Salary,
        //         as: 'salary',
        //         attributes: ['amount']

        //       },
        //     //   {
        //     //     model: Title,
        //     //     as: 'title',
        //     //     attributes: ['title']
        //     //   }
        //     ],
        
        // }
        // );

        
    }
    async confirmationUpdate(id,confirmed) {
        console.log("]]]]",id,confirmed);
        
        const data = {
            confirmed: confirmed
        } 
        const [numberOfAffectedRows, [updatedPost]] = await this.employeeProfileRepository.update(data, { where: { employee_id : id }, returning: true });
        const updateProfile = await this.employeeProfileRepository.findOne(
            {
                where:{employee_id : id,
            }
        })
        
        if(updateProfile.confirmed === true){       

        const proupdate = await this.employeeService.updateProfile(updateProfile);
         console.log("..proupdate..",proupdate);
         
        return { proupdate };
        }
        else{
            const notConfirmed = await this.employeeProfileRepository.destroy({ where: { employee_id : id }});
            return { numberOfAffectedRows, updatedPost, notConfirmed };

        }
    }
 
    
}