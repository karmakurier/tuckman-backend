import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

    constructor(private roomService: RoomsService) {
    }

    @Get()
    async findAll(@Query('roomQuestionnaireId') roomQuestionnaireId: string, @Query('roomResultsId') roomResultsId: string) {

        //tbd: add logic to return only the room matching questionareid or resultsid!
        return await this.roomService.findAll();
    }
}
