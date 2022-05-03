/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Employee } from 'src/models/employee.model';
import { Role } from 'src/models/role.enum';
import { EmployeeDto, UpdateRoleDto } from '../dto/create-employee.dto';
import { EmployeeService } from '../services/employee.service';
// import {
//   PaginateQueryInterface,
//   PaginateQuery,
// } from 'nestjs-sequelize-paginate';
// import { CreateEmployeeDto } from '../dto/create-employee.dto';
@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Roles(Role.SUPERVISOR, Role.MANAGER) //Admin ?
  @Post('/createEmployee')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
  @ApiResponse({ status: 201, description: 'The employee has been successfully created.'})
 @ApiResponse({ status: 403, description: 'Forbidden.'})
  // @ApiCreatedResponse('')
  async createEmployee(@Res() response, @Body() empDto: EmployeeDto) {
    console.log(";;;;",empDto);
    
    const newEmployee = await this.employeeService.create(empDto);
    return response.status(HttpStatus.CREATED).json({
      newEmployee,
    });
  }
  @Roles(Role.SUPERVISOR) //Admin ?
  @Put('/updateRole')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
  @ApiResponse({ status: 201, description: 'The role of the employee has been successfully updated.'})
 @ApiResponse({ status: 403, description: 'Forbidden.'})
  // @ApiCreatedResponse('')
  async updateRole(@Res() response, @Body() UpdateRole: UpdateRoleDto) {
    console.log(";;;;",UpdateRole);
    
    const newEmployee = await this.employeeService.updateRole(UpdateRole);
    return response.status(HttpStatus.CREATED).json({
      newEmployee,
    });
  }
@Roles(Role.MANAGER)
@Put('remove/:id')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
// @ApiQuery({
//   description: 'Remove tag get updated if employee remove',
// })
async update(@Param('id') id: number, description: 'Remove tag get updated if employee remove'): Promise<Employee> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.employeeService.update(id);

    // if the number of row affected is zero, it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This employee doesn\'t exist');
    }

    // return the updated post
    return updatedPost;
}
@Roles(Role.SUPERVISOR)
@Put('delete/:id')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiBody({
  description: 'Deleted tag get updated if manager confirm the removal',
})
async updateRemovalRequest(@Param('id') id: number, @Body()  req): Promise<Employee> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.employeeService.updateRemovalRequest(id);

    // if the number of row affected is zero, it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This employee doesn\'t exist');
    }

    // return the updated post
    return updatedPost;
}
@Roles(Role.SUPERVISOR)
@Get('getRemovedEmployees')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
async fetchAll(@Res() response) {
  const employees = await this.employeeService.findAllRemovedEmp();
  return response.status(HttpStatus.OK).json({
    employees,
  });
}
@Get('geAllEmployees/:search')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
async fetchAllEmp(@Res() response, @Param('search') search : string) {
  const employees = await this.employeeService.findAllEmp(search);
  return response.status(HttpStatus.OK).json({
    employees,
  });
}
@Get('getProfile/:id')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
async getProfile(@Res() response, @Param('id') id: number,) {
  const employees = await this.employeeService.getProfile(id);
  return response.status(HttpStatus.OK).json({
    employees,
  });
}
// filter and pagination
// @Get()
// index(
//   @Query('page') page:number =1,
//   @Query('limit') limit: number =10,
//   @Query('username') username: string
// ): Observable<Pagination<Employee>>{
//   limit = limit > 100 ? 100 : limit;
//   console.log(username);
//   return this.employeeService.paginate({page:Number(page), limit:Number(limit),route:'http://localhost:8080/api/employees'})
// }
// }
// @Get()
//    async getUsers(
//       @Res() response,
//       @PaginateQuery('all') paginateQuery: PaginateQueryInterface,
//    ): Promise<any> {
//       const data = await this.employeeService.findAll(paginateQuery);
//       return response.status(HttpStatus.OK).send(data);
//    }
// @Get('getActiveEmployees')
  // async fetchAll(@Res() response) {
  //   const employees = await this.employeeService.fetchAll();
  //   return response.status(HttpStatus.OK).json({
  //     employees,
  //   });
  // }
// @Put(':employee_id')
// async update(@Res() response,@Param('employee_id') employee_id: number, @Body() employee: Employee) {
  
//   const empRes = await this.employeeService.update(employee_id);
//   return response.status(HttpStatus.OK).json({
//     empRes,
//   });  }

// @UseGuards(AuthGuard('jwt'))
// manager
  }