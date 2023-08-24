import {Controller, Get, UseGuards} from '@nestjs/common';

@Controller('admin')
export class AdminController {

    @Get('editor')
    editorPage() {
        return "editor Page";
    }
    @Get()
    adminPage() {
        return "this is the admin page";
    }
}
