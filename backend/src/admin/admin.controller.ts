import {Controller, Get, UseGuards, Param, Body, Post} from '@nestjs/common';
import { AdminService } from "./admin.service";
import { CreateQuestionDto } from "./dto/create-question";
import { AdminGuard } from "./admin.guard";

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
    constructor(
        private readonly adminSerivce: AdminService,
    ) {
    }


    @Get('editor')
    editorPage() {
        return this.adminSerivce.getAllQuestions();
    }

    /**
     *
     * @param createQuestionDto
     *
     * Test with Curl
     *
     * curl -X POST -H "Content-Type: application/json" -d "{\"text\": \"Was ist die Hauptstadt von Frankreich?\", \"options\": [\"Berlin\", \"Madrid\", \"Paris\", \"Rom\"], \"correctAnswer\": \"Paris\"}" http://localhost:3000/admin/editor/create
     */
    @Post('editor/create')
    async createQuestionById(@Body() createQuestionDto: CreateQuestionDto){
        return this.adminSerivce.createQuestion(createQuestionDto);
    }
    @Get()
    adminPage() {
        return "this is the admin page";
    }
}
