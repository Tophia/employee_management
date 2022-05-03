import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Res,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SalaryServices } from '../services/salary.service';
import { CreateSalaryDto } from '../dto/create-salary.dto';
import { Salary } from '../../../models/salary.model';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Salary')
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryServices) {}
  @Post('/salaryUpdation')
  @ApiResponse({
    status: 201,
    description: 'The salary has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  //   @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  async create(@Res() response, @Body() salaryUpdation: CreateSalaryDto) {
    const salary = await this.salaryService.createOrUpdate(salaryUpdation);
    return response.status(HttpStatus.CREATED).json({
      salary,
    });
  }
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async fetchAll(@Res() response) {
    const salary = await this.salaryService.findAll();
    return response.status(HttpStatus.OK).json({
      salary,
    });
  }
  @Get('/timePeriod')
  //   @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  async fetchSal(
    @Query('time_period') time_period: number,
    @Query('employeeID') employeeID: number,
    @Res() response,
  ) {
    console.log('empppp', time_period, employeeID);

    const salary = await this.salaryService.fetchSal(time_period, employeeID);
    return response.status(HttpStatus.OK).json({
      salary,
    });
  }
  // @Put(':employee_id')
  // async update(@Res() response,@Param('employee_id') employee_id: string, @Body() title: Title) {
  //   const titleRes = await this.titleService.update(employee_id,title);
  //   return response.status(HttpStatus.OK).json({
  //     titleRes,
  //   });  }
}
