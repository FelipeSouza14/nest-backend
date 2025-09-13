import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

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
    createTask(@Body() body: any){
        return this.taskService.create(body)
    }

    @Patch(":id")
    updateTask(@Param('id') id: string, @Body() body: any){
        console.log("ID", id)
        console.log("Body", body)
        return "Atualizando tarefa..."
    }

    @Delete(":id")
    deleteTask(@Param('id') id: string){
        console.log("ID ENVIADO: " + id)

        return "Deletar a tarefa com o ID " + id
    }

}
