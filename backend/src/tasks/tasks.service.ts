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

    findAll(){
        return this.tasks
    }

    findOne(id: string){
        return this.tasks.find(tasks => tasks.id === Number(id))
    }

    create(body: any){
        const newId = this.tasks.length + 1

        const newTask = {
            id: newId,
            ...body,
        }

        this.tasks.push(newTask)

        return newTask
    }
}
