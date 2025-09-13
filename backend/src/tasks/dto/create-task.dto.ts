/*
DTO > Data Transfer Object (Objeto de transferencia de dados)
> Validar dados, transformar dados.
> Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
*/

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
}