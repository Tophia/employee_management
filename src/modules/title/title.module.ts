/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TitleService } from './services/title.service';
import { TitleController } from './controllers/title.controller';
import { titleProviders } from './providers/title.providers';
import { Title } from 'src/models/title.model';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SequelizeModule.forFeature([Title]),PassportModule],
  controllers: [TitleController],
  providers: [TitleService, ...titleProviders],
})
export class TitleModule {}
