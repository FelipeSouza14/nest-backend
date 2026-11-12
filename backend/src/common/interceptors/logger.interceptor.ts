import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    // O interceptor serve para logar informações sobre as requisições e respostas
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();
        
        console.log(`[REQUEST] ${method} ${url} - Início da requisição`);

        return next.handle().pipe(
            tap(() => {
                console.log(`[RESPONSE] ${method} ${url} - ${Date.now() - now}ms - Fim da requisição`);
            })
        );
    }
}