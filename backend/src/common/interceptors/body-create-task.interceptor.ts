import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyCreateTaskInterceptor implements NestInterceptor {
    // Este interceptor serve para logar informações sobre o corpo da requisição quando uma nova task é criada
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
        const { method, url, body } = request;

        console.log(`[REQUEST] ${method} ${url}`)
        console.log(`[BODY] ${JSON.stringify(body, null, 2)}`)

        return next.handle();
    }
}