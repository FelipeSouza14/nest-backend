import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    // Procura por todas as tasks e as exibe, sem filtro
    async findAll(paginationDto?: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};

        const allTasks = await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                id: 'asc',
            },
        });
        return allTasks;
    }

    // Procura por uma task específica e a exibe, filtrando pelo ID que é passado
    async findOne(id: number) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: id,
            },
        });

        if (task?.name) return task;

        // throw new HttpException("Esta tarefa não existe!", HttpStatus.NOT_FOUND) -> Essa é uma forma clássica para fazer o tratamento de erro
        // -> Nessa forma de cima utiliza-se o HttpException para enviar uma mensagem de erro, pegando o status com o HttpStatus

        throw new NotFoundException('Tarefa não foi encontrada!'); // -> Nessa outra forma utiliza-se uma função direta do Nest.js,
        // ...que tem o mesmo tratamento de erro que a primeira, porém, mais direta.
    }

    // Cria uma nova task, incrementando o ID automaticamente
    async create(createTaskDto: CreateTaskDto) {
        try {
            const newTask = await this.prisma.task.create({
                data: {
                    name: createTaskDto.name,
                    description: createTaskDto.description,
                    completed: false,
                    userId: createTaskDto.userId,
                },
            });

            return newTask;

        } catch (error) {
            throw new HttpException(
                'Erro ao criar tarefa!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // Procura por uma task específica e a atualiza (atualiza de acordo com o que é passado com base no updateTaskDto), filtrando pelo ID que é passado
    async update(id: number, updateTaskDto: UpdateTaskDto) {
        try {
            const findTask = await this.prisma.task.findFirst({
                where: {
                    id: id,
                },
            });

            if (!findTask)
                throw new NotFoundException('Esta tarefa não existe!');

            const task = await this.prisma.task.update({
                where: {
                    id: findTask.id,
                },
                data: {
                    name: updateTaskDto?.name ? updateTaskDto?.name : findTask.name,
                    description: updateTaskDto?.description ? updateTaskDto?.description : findTask.description,
                    completed: updateTaskDto?.completed ? updateTaskDto?.completed : findTask.completed,
                }
            });

            return task;

        } catch (error) {
            throw new HttpException(
                'Erro ao atualizar tarefa!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // Procura por uma task específica e a deleta, filtrando pelo ID que é passado
    async delete(id: number) {
        try {
            const findTask = await this.prisma.task.findFirst({
                where: {
                    id: id,
                },
            });

            if (!findTask)
                throw new NotFoundException('Esta tarefa não existe!');

            await this.prisma.task.delete({
                where: {
                    id: findTask.id,
                },
            });

            return {
                message: 'Tarefa deletada com sucesso!',
            };
        } catch (error) {
            throw new HttpException(
                'Erro ao deletar tarefa!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
