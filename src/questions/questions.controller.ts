import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

    constructor(private questionService: QuestionsService) {

    }

    @Get()
    async findAll() {
        return await this.questionService.findAll();
    }
}
