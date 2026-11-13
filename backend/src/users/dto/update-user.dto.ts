import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

// Caso seja necessário, é possível adicionar mais opções de campos para serem atualizados. Atualmente, apenas atualiza os campos existentes em CreateUserDto.
export class UpdateUserDto extends PartialType(CreateUserDto) {}