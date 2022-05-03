/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Employee } from 'src/models/employee.model';
import { Employee_Profile } from 'src/models/empolyeeProfile.model';
import { Role } from 'src/models/role.enum';
import { UpdatedProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../services/profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('/updateProfile')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'The profile updation has been requested for the updation'})
 @ApiResponse({ status: 403, description: 'Forbidden.'})
  // @ApiCreatedResponse('')
  async UpdateProfile(@Res() response, @Body() UpdateProfile: UpdatedProfileDto) {    
    const newEmployee = await this.profileService.updateProfile(UpdateProfile);
    return response.status(HttpStatus.CREATED).json({
      newEmployee,
    });
  }
@Roles(Role.MANAGER) 
@Get('getUpdatedProfiles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
async getProfile(@Res() response, 
// @Param('employee_id') employee_id : number
){  
  const employees = await this.profileService.getProfile();
  return response.status(HttpStatus.OK).json({
    employees,
  });
}
@Roles(Role.MANAGER)
@Put('confirmUpdation/:id')
@ApiQuery({ name: 'confirmed' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
async confirmationUpdate(@Param('id') id: number, 
@Query('confirmed') confirmed: boolean,
// @Param('confirmed') confirmed: boolean 
): Promise<Employee_Profile> {
  console.log(";;=====",confirmed);
   
  const { numberOfAffectedRows, updatedPost } = await this.profileService.confirmationUpdate(id,confirmed);
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This employee doesn\'t exist');
    }

    // return the updated post
    return updatedPost;
}
  }