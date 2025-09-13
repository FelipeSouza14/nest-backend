import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        {
            id: 1,
            name: "Comprar Pães",
            description: "Estamos precisando de pães",
            completed: false
        }
    ]

    // Exibe todas as tasks, exibe a lista toda
    findAll(){
        return this.tasks
    }

    // Exibe apenas uma, filtrando pelo ID que é passado
    findOne(id: string){
        const task = this.tasks.find(tasks => tasks.id === Number(id))

        if (task) return task;

        // throw new HttpException("Esta tarefa não existe!", HttpStatus.NOT_FOUND) -> Essa é uma forma clássica para fazer o tratamento de erro
        // -> Nessa forma de cima utiliza-se o HttpException para enviar uma mensagem de erro, pegando o status com o HttpStatus 

        throw new NotFoundException("Esta tarefa não existe!") // -> Nessa outra forma utiliza-se uma função direta do Nest.js, 
        // ...que tem o mesmo tratamento de erro que a primeira, porém, mais direta.
    }

    // Cria uma nova task, incrementando o ID automaticamente
    create(body: any){
        const newId = this.tasks.length + 1

        const newTask = {
            id: newId,
            ...body,
        }

        this.tasks.push(newTask)

        return newTask
    }

    // Atualiza uma task
    update(id: string, body: any ){
        // Nessa função, o algoritmo encontra a tarefa a qual o id é igual ao id passado, e salva o index (localização dessa tarefa)
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))

        if (taskIndex < 0){
            throw new NotFoundException("Esta tarefa não existe!")
        }
       
        const taskItem = this.tasks[taskIndex]

        // Pega os itens que já tem "taskItem" e atualiza para os novos que virão do "body"
        this.tasks[taskIndex] = {
            ...taskItem,
            ...body
        }

        return this.tasks[taskIndex]
    }

    delete(id: string){
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))

        if (taskIndex < 0){
            throw new NotFoundException("Esta tarefa não existe!")
        }

        this.tasks.splice(taskIndex, 1)

        return {
            message: "Tarefa excluída com sucesso!"
        }
    }
}
