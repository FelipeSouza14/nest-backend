import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
    // Este interceptor serve para adicionar um header personalizado na resposta da requisição
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const response = context.switchToHttp().getResponse();

        response.setHeader('X-Custom-Header', 'Valor do Header Personalizado');

        return next.handle();
    }
}