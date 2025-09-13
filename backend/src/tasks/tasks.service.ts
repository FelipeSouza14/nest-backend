import { Injectable } from '@nestjs/common';
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
        return this.tasks.find(tasks => tasks.id === Number(id))
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

        if (taskIndex >= 0){
            const taskItem = this.tasks[taskIndex]

            // Pega os itens que já tem "taskItem" e atualiza para os novos que virão do "body"
            this.tasks[taskIndex] = {
                ...taskItem,
                ...body
            }
        }

        return "Tarega atualizada com sucesso!!!"
    }
}
