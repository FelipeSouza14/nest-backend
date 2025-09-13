import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService){}
    // Criando uma rota que devolve todas as tasks
    @Get()
    findAllTasks(){
        return this.taskService.findAll()
    }

    // Criando uma rota que devolve uma única task de acordo com o ID
    @Get(":id")
    findOneTask(@Param('id') id: string){
        console.log(id)
        return this.taskService.findOne(id)
    }

    // Criando uma rota que cadastra uma nova task
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto){
        return this.taskService.create(createTaskDto)
    }

    // Criando uma rota que atualiza uma task pelo ID (pode ser tanto do tipo PATCH quanto do tipo PUT)
    @Patch(":id")
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto){

        return this.taskService.update(id, updateTaskDto)
    }

    // Criando uma rota que deleta uma task pelo ID
    @Delete(":id")
    deleteTask(@Param('id') id: string){

        return this.taskService.delete(id);
    }

}
