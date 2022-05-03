/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './services/auth.services';
import { AuthController } from './controllers/auth.controller';
import { EmployeeModule } from '../employee/employee.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { Employee } from '../../models/employee.model';

@Module({
    imports: [
        // SequelizeModule.forFeature([Employee]),
        PassportModule,
        EmployeeModule,
        JwtModule.register({
            secret: process.env.JWTKEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RolesGuard
    ],
    controllers: [AuthController],
})
export class AuthModule { }