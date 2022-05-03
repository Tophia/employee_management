/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/models/role.enum';
import { CreateDepartmentManagerDto } from '../dto/create-departmentManager.dto';
  import { DepartmentManagerService } from '../services/departmentManager.service';
  @ApiTags('Department Manager')
  @Controller('departmentManager')
  export class DepartmentManagerController {
    constructor(private readonly departmentmanagerService: DepartmentManagerService) {}
    @Roles(Role.SUPERVISOR)
    @Post('/managerUpdation')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @ApiResponse({ status: 201, description: 'The manager has been successfully updated.'})
   @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Res() response, @Body() deptManagerUpdation: CreateDepartmentManagerDto) {
      const salary = await this.departmentmanagerService.createOrUpdate(deptManagerUpdation);
      return response.status(HttpStatus.CREATED).json({
        salary,
      });
    }
  
    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    async fetchAll(@Res() response) {
      const departments = await this.departmentmanagerService.findAll();
      return response.status(HttpStatus.OK).json({
        departments,
      });
    }
  
    @Get('/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async findById(@Res() response, @Param('id') id:string) {
      const departments = await this.departmentmanagerService.findOne(id);
      return response.status(HttpStatus.OK).json({
        departments,
      });
    }
    @Roles(Role.SUPERVISOR)
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    async remove(@Res() response,@Param('id') id: string) {
      const departments = await this.departmentmanagerService.delete(id);
      return response.status(HttpStatus.OK).json({
        departments,
      });  }
      //     @Put(':id')
//     @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
//     async update(@Res() response,@Param('id') id: string, @Body() department: CreateDepartmentManagerDto) {
//       const departmentsRes = await this.departmentmanagerService.update(id,department);
//       return response.status(HttpStatus.OK).json({
//         departmentsRes,
//       });  }
  }
  