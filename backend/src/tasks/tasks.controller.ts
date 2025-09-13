import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService){}

    @Get()
    findAllTasks(){
        return this.taskService.findAll()
    }

    @Get(":id")
    findOneTask(@Param('id') id: string){
        console.log(id)
        return this.taskService.findOne(id)
    }

}
