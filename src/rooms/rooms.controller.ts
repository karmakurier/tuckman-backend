import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/common/mail.service';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateRoom } from './createRoom.entity';
import { QuestionnairesService } from 'src/questionnaires/questionnaire.service';
import { verify } from 'hcaptcha';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(
    private roomService: RoomsService,
    private questionnaireService: QuestionnairesService,
    private mailService: MailService,
  ) { }

  @Get()
  async findAll(@Query('roomResultsId') roomResultsId: string) {
    //tbd: add logic to return only the room matching questionareid or resultsid!
    return await this.roomService.findRoomByRoomUUID(roomResultsId);
  }

  @Post()
  async createSingle(@Body() room: CreateRoom): Promise<Room> {

    let captchaResult = await verify('0x4Dbb3234Aa6549F304386ebc83f7b227936D8a30', room.hcaptchaValue);
    if (captchaResult.success) {
      // inits uuids
      const newRoom = new Room();
      newRoom.roomUUID = uuidv4();
      newRoom.participateUUID = uuidv4();

      newRoom.initiatorEmail = room.initiatorEmail;

      const roomQuestionnaire = await this.questionnaireService.findOne(
        room.roomQuestionnaireId,
      );
      newRoom.roomQuestionnaire = roomQuestionnaire;
      newRoom.teamName = room.teamName;
      newRoom.notes = room.notes;
      if (!room.expiresAt) {
        newRoom.expiresAt = new Date(1970, 0, 0, 0);
      } else {
        newRoom.expiresAt = room.expiresAt;
      }

      // send invite mail
      /*this.mailService.sendMail(
        this.mailService.generateWelcomeMail(room.roomUUID, room.participateUUID),
        room.initiatorEmail,
        'Willkommen zur Tuckman Analyse - Karmakuirer',
        (err, res) => {},
      );*/

      // dont save mail
      newRoom.initiatorEmail = 'clean';

      // return the created room
      return await this.roomService.createOne(newRoom);
    } else {
      return null;
    }

  }

  /*@Put(':id')
  async updateSingle(
    @Param('id') id: number,
    @Body() question: Room,
  ): Promise<Room> {
    return await this.roomService.createOne(question);
  }

  @Delete(':id')
  async deleteSingle(@Param('id') id: number) {
    return await this.roomService.remove(id);
  }*/
}
