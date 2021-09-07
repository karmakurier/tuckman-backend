import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/common/mail.service';
import { Questionnaire } from 'src/questionnaires/questionnaire.entity';
import { QuestionnairesService } from 'src/questionnaires/questionnaire.service';
import { Room } from './room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Questionnaire])],
  providers: [RoomsService, QuestionnairesService, MailService],
  controllers: [RoomsController],
})
export class RoomsModule {}
