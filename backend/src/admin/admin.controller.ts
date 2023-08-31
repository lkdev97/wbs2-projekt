import {
  Controller,
  Get,
  UseGuards,
  Param,
  Body,
  Post,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateQuestionDto } from './dto/create-question';
import { AdminGuard } from './admin.guard';
import { UpdateQuestionDto } from './dto/update-question';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('admin')
@UseGuards(AdminGuard)
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('editor')
  @ApiOperation({ summary: 'Retrieve all questions' })
  @ApiResponse({ status: 200, description: 'Return all questions.' })
  editorPage() {
    return this.adminService.getAllQuestions();
  }

  @Post('editor/create')
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'The question has been successfully created.',
  })
  @ApiBody({ type: CreateQuestionDto })
  async createQuestionById(@Body() createQuestionDto: CreateQuestionDto) {
    return this.adminService.createQuestion(createQuestionDto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an existing question' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully updated.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the question to update',
  })
  @ApiBody({ type: UpdateQuestionDto })
  async updateQuestion(
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Param('id') id: string,
  ) {
    try {
      const updatedQuestion = await this.adminService.updateQuestion(
        id,
        updateQuestionDto,
      );
      return updatedQuestion;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('editor/delete/:id')
  @ApiOperation({ summary: 'Delete an existing question' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the question to delete',
  })
  async deleteCardById(@Param('id') id: string) {
    return this.adminService.deleteQuestion(id);
  }

  @Get()
  @ApiOperation({ summary: 'Admin main page' })
  @ApiResponse({ status: 200, description: 'Admin main page displayed.' })
  adminPage() {
    return 'this is the admin page';
  }
}
