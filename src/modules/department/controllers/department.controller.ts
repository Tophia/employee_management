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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from '../dto/create-department.dto';
  import { DepartmentService } from '../services/department.services';
  @ApiTags('Department')
  @Controller('department')
  export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}
  
    @Post('/createDepartment')
//     @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
    async createDepartment(@Res() response, @Body() department: CreateDepartmentDto) {
      const newDepartment= await this.departmentService.createDepartment(department);
      return response.status(HttpStatus.CREATED).json({
        newDepartment,
      });
    }
  
    @Get()
    @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
    async fetchAll(@Res() response) {
      const departments = await this.departmentService.findAll();
      return response.status(HttpStatus.OK).json({
        departments,
      });
    }
  
    @Get('/:id')
    @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
    async findById(@Res() response, @Param('id') id:string) {
      const departments = await this.departmentService.findOne(id);
      return response.status(HttpStatus.OK).json({
        departments,
      });
    }
    @Put(':id')
    @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
    async update(@Res() response,@Param('id') id: string, @Body() department: CreateDepartmentDto) {
      const departmentsRes = await this.departmentService.update(id,department);
      return response.status(HttpStatus.OK).json({
        departmentsRes,
      });  }
  
    @Delete(':id')
    @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
    async remove(@Res() response,@Param('id') id: string) {
      const departments = await this.departmentService.delete(id);
      return response.status(HttpStatus.OK).json({
        departments,
      });  }
  }
  