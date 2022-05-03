/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, UseGuards } from '@nestjs/common';
import { TitleService } from '../services/title.service';
import { CreateTitleDto } from '../dto/create-title.dto';
import { Title } from 'src/models/title.model';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Title')
@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}
  @Post('/titleUpdation')
  @ApiResponse({ status: 201, description: 'The title has been successfully updated.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  // @ApiCreatedResponse('')
  async create(@Res() response, @Body() CreateTitleDto: CreateTitleDto) {
    const newEmployee = await this.titleService.create(CreateTitleDto);
    return response.status(HttpStatus.CREATED).json({
      newEmployee,
    });
  }
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async fetchAll(@Res() response) {
    const titles = await this.titleService.findAll();
    return response.status(HttpStatus.OK).json({
      titles,
    });
  }
@Get(':employee_id')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
async update(@Res() response,@Param('employee_id') employee_id: string) {
  const titleRes = await this.titleService.update(employee_id);
  return response.status(HttpStatus.OK).json({
    titleRes,
  });  }

}