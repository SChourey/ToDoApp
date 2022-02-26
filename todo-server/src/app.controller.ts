import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ToDoInterface } from './types';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTodos(@Query('title') title?: string) {
    return await this.appService.getTodos(title);
  }

  @Post()
  async create(@Body() todoList: ToDoInterface) {
    return await this.appService.addTodo(todoList);
  }

  @Put()
  async update(@Body() todoList: ToDoInterface) {
    return await this.appService.updateTodo(todoList);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.appService.deleteTodo(id);
  }
}
