import { IsBoolean, IsOptional, IsString } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from '../dto/create-task.dto'

// export class UpdateTaskDto {

//   @IsString()
//   @IsOptional()
//   readonly name?: string;
  
//   @IsString()
//   @IsOptional()
//   readonly description?: string;
  
//   @IsBoolean()
//   @IsOptional()
//   readonly completed?: boolean;
// }

// O "PartialType" Reaproveita o que já tem no CreateTaskDto (transforma em um tipo opcional), e, caso seja necessário, pode adicionar a mais também (foi add o completed)
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean;

}