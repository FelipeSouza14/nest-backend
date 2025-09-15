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

// Reaproveita o que já tem no CreateTaskDto, e, caso seja necessário, adiciona a mais também
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean;

}