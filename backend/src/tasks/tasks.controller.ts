import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { LoggerInterceptor } from '../common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from '../common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from '../common/interceptors/add-header.interceptor';

@Controller('tasks')
@UseInterceptors(LoggerInterceptor) // -> Aqui é onde o interceptor é aplicado, para que ele seja chamado em todas as rotas do controller
export class TasksController {
    constructor(private readonly taskService: TasksService){}

    // Criando uma rota que devolve todas as tasks
    @Get()
    @UseInterceptors(AddHeaderInterceptor) // -> Aqui é onde o interceptor é aplicado, para que ele seja chamado apenas nessa rota
    findAllTasks(@Query() paginationDto: PaginationDto){
        return this.taskService.findAll(paginationDto)
    }

    // Criando uma rota que devolve uma única task de acordo com o ID
    @Get(":id")
    findOneTask(@Param('id', ParseIntPipe) id: number){
        console.log(id)
        return this.taskService.findOne(id)
    }

    // Criando uma rota que cadastra uma nova task
    @Post()
    @UseInterceptors(BodyCreateTaskInterceptor) // -> Aqui é onde o interceptor é aplicado, para que ele seja chamado apenas nessa rota
    createTask(@Body() createTaskDto: CreateTaskDto){
        return this.taskService.create(createTaskDto)
    }

    // Criando uma rota que atualiza uma task pelo ID (pode ser tanto do tipo PATCH quanto do tipo PUT)
    @Patch(":id")
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto){

        return this.taskService.update(id, updateTaskDto)
    }

    // Criando uma rota que deleta uma task pelo ID
    @Delete(":id")
    deleteTask(@Param('id', ParseIntPipe) id: number){

        return this.taskService.delete(id);
    }

}
