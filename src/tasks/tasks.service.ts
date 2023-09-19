import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTaskById(taskId: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id: taskId });
    if (!found) {
      throw new NotFoundException(`task with ID ${taskId} is not Found`);
    }
    return found;
  }

  getTasks(filterTasksDto: FilterTasksDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTasksDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(taskId: string, newStatus: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(taskId);
    task.status = newStatus;

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTaskById(taskId: string): Promise<Task> {
    const task: Task = await this.getTaskById(taskId);
    this.taskRepository.remove(task);
    return task;
  }
}
