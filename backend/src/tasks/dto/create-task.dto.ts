/*
DTO > Data Transfer Object (Objeto de transferencia de dados)
> Validar dados, transformar dados.
> Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
*/

import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

  // Decorators que fazem a validação do tipo de dado. Por exemplo "@IsString" verifica se o dado é uma string.
  // Podem ser passados mensagens através deles, por exemplo @MinLength({message: "O nome precisa ter mais de 5 caracteres!"})
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly description: string;
}