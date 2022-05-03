/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Employee } from '../../../models/employee.model';
import { EmployeeDto } from '../dto/create-employee.dto';
import { EMPLOYEE_REPOSITORY } from '../../../core/constants/index';
import { Salary } from 'src/models/salary.model';
import { Title } from 'src/models/title.model';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { error } from 'console';

@Injectable()
export class EmployeeService {

    constructor(@Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: typeof Employee) { }

    async create(user: EmployeeDto): Promise<Employee> {
        return await this.employeeRepository.create<Employee>(user);
    }

    async findOneByEmail(email: string): Promise<Employee> {
        return await this.employeeRepository.findOne<Employee>({ where: { email } });
    }

    async findOneById(id: number): Promise<Employee> {
        return await this.employeeRepository.findOne<Employee>({ where: { id } });
    }
    async fetchAll(): Promise<Employee[]> {
        return this.employeeRepository.findAll();
      }

    //   async update(employee_id, deleted) {
    //     const [numberOfAffectedRows, [updatedPost]] = await this.employeeRepository.update( deleted , { where: { employee_id }, returning: true });
    //   }
    async update(id) {
        const data = {
            removed: true
        }
        console.log("employee_id",id);
        
        const [numberOfAffectedRows, [updatedPost]] = await this.employeeRepository.update(data, { where: { id : id }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }
    async updateRole(UpdateRole) {
        const data = {
            roles: UpdateRole.role
        }
        console.log("data",data);
        
        const [numberOfAffectedRows, [updatedPost]] = await this.employeeRepository.update(data, { where: { id : UpdateRole.employee_id }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }
    async findAllRemovedEmp(): Promise<Employee[]> {
        return this.employeeRepository.findAll({where:{deleted:true}});
      }
      async findAllEmp(search): Promise<Employee[]> {
          console.log("]]]====",search);
          try{
            //   const search = await this.employeeRepository.queryBuilder(alias:)
        return this.employeeRepository.findAll({
            attributes: [ 'id', 'first_name','last_name','roles','email' ],
			where: {
				// first_name: '%'+ search +'%',
                // last_name: '%'+ search +'%',
                // roles:  '%'+ search +'%',
                 //////=================================

                // $or:[
                //     {
                //         'first_name' :{
                //             like:'%' + search + '%'
                //         }
                //     }
                // ]
                 //////=================================
                //  [ Op.or]:[
                //     {
                //         'first_name' :{
                //             like:'%' + search + '%'
                //         }
                //     },
                //     { '$Comment.body$': { [Op.like]: '%' + search + '%' } }
                // ]
                                //////=================================
                                // first_name: {
                                //     $like: '%' + search + '%'
                                //   },
                                //   email: {
                                //     $like: '%' + search + '%'
                                //   },

                                //////=================================
                                first_name: {
                                    [Op.like]: '%' + search + '%'
                                  },
                                  last_name: {
                                    [Op.like]: '%' + search + '%'
                                  },
                                  email: {
                                    [Op.like]: '%' + search + '%'
                                  },
                      
			},
		// 	// order: [ [ 'id', 'ASC' ] ]
        }
        );
      }
      catch(e){
          return e
      }
    }
      async getProfile(id): Promise<Employee> {
        return await this.employeeRepository.findOne<Employee>(
            { where: { id :id },
            include: [{
                model: Salary,
                as: 'salary',
                attributes: ['amount']

              },{
                model: Title,
                as: 'title',
                attributes: ['title']
              }],
        
        });

        
    }
    async updateRemovalRequest(id) {
        const data = {
            deleted: true
        }
        console.log("employee_id",id);
        
        const [numberOfAffectedRows, [updatedPost]] = await this.employeeRepository.update(data, { where: { id : id }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }
    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async updateProfile(updateProfile) {
        console.log("emp service ....",updateProfile);
        const pass = await this.hashPassword(updateProfile.password);
        const data = {
            first_name: updateProfile.first_name,
            last_name: updateProfile.last_name,
            birth_date: updateProfile.birth_date,
            hire_date: updateProfile.hire_date,
            email: updateProfile.email,
            password: pass,
            employee_gender: updateProfile.employee_gender
        }
        
        const [numberOfAffectedRows, [updatedPost]] = await this.employeeRepository.update(data, { where: { id : updateProfile.employee_id }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }
    
}