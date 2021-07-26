import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/common/mail.service';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(
    private roomService: RoomsService,
    private mailService: MailService,
  ) {}

  @Get()
  async findAll(
    @Query('roomQuestionnaireId') roomQuestionnaireId: string,
    @Query('roomResultsId') roomResultsId: string,
  ) {
    //tbd: add logic to return only the room matching questionareid or resultsid!
    return await this.roomService.findAll();
  }

  @Post()
  async createSingle(@Body() room: Room): Promise<Room> {
    // inits uuids
    room.roomUUID = uuidv4();
    room.participateUUID = uuidv4();

    // send invite mail
    this.mailService.sendMail(
      this.mailService.generateWelcomeMail(room.roomUUID, room.participateUUID),
      room.initiatorEmail,
      'Willkommen zur Tuckman Analyse - Karmakuirer',
      (err, res) => {},
    );

    // dont save mail
    room.initiatorEmail = 'clean';

    // return the created room
    return await this.roomService.createOne(room);
  }

  @Put(':id')
  async updateSingle(
    @Query('id') id: number,
    @Body() question: Room,
  ): Promise<Room> {
    return await this.roomService.createOne(question);
  }

  @Delete(':id')
  async deleteSingle(@Query('id') id: number) {
    return await this.roomService.remove(id);
  }
}
