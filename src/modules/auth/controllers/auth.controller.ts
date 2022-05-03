/* eslint-disable prettier/prettier */
import { Controller, Body, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.services';
import { EmployeeDto, EmployeeLoginDto } from '../../employee/dto/create-employee.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: EmployeeLoginDto,@Request() req) {
        console.log("....",req.user);
        
        return await this.authService.login(req.user);
    }

    @Post('signup')
    async signUp(@Body() user: EmployeeDto) {
        return await this.authService.create(user);
    }
    // @Get('getEmployees')
    // async fetchAll(@Res() response) {
    //     return await this.authService.findAll();
    // }
    
}