import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterTasksDto: FilterTasksDto): Promise<Task[]> {
    return this.taskService.getTasks(filterTasksDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Promise<Task> {
    return this.taskService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { newStatus } = updateTaskDto;
    return this.taskService.updateTaskStatus(taskId, newStatus);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') taskId: string): Promise<Task> {
    return this.taskService.deleteTaskById(taskId);
  }
}
