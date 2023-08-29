import {Controller, Get, UseGuards, Param, Body, Post, Delete, Patch, NotFoundException} from '@nestjs/common';
import { AdminService } from "./admin.service";
import { CreateQuestionDto } from "./dto/create-question";
import { AdminGuard } from "./admin.guard";
import { UpdateQuestionDto } from './dto/update-question';

@Controller('admin')
//@UseGuards(AdminGuard)
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
    async createQuestionById(@Body() createQuestionDto: CreateQuestionDto)
    {
        return this.adminSerivce.createQuestion(createQuestionDto);
    }

    /**
     * 
     * @param updateQuestionDto 
     * @param id 
     * @returns 
     * 
     * Test with curl
     * 
     * curl -X PATCH "http://localhost:3000/admin/update/1" -H "Content-Type: application/json" -d "{\"text\": \"Die neue Frage\"}"
     * 
     * curl -X PATCH  "http://localhost:3000/admin/update/1" -H "Content-Type: application/json" -d "{\"options\": [\"Neue Option 1\", \"Neue Option 2\", \"Neue Option 3\", \"Neue Option 4\"], \"correctAnswer\": \"Neue Option 2\"}"
     */
    @Patch('update/:id')
    async updateQuestion(@Body() updateQuestionDto: UpdateQuestionDto, @Param('id') id: string) {
        try {
            const updatedQuestion = await this.adminSerivce.updateQuestion(id, updateQuestionDto);
            return updatedQuestion;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }   
    }
    /**
     *
     * @param id
     *
     * Test with curl
     *
     * replace 1 with any valid 'id' from question_entity
     *
     * >curl -X DELETE http://localhost:3000/admin/editor/delete/1
     */
    @Delete('editor/delete/:id')
    async deleteCardById(@Param('id') id: string) {
        return this.adminSerivce.deleteQuestion(id);
    }
    @Get()
    adminPage() {
        return "this is the admin page";
    }
}
