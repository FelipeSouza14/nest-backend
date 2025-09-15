import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
- `src/app.module.ts`: Módulo principal do aplicativo.
- `src/app.controller.ts`: Define as rotas e lida com as requisições.
- `src/app.service.ts`: Contém a lógica de negócio separado do controlador.
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true // Se TRUE ele remove as chaves que não estão no DTO
    }
  ))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
