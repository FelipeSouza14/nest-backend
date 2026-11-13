import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Min, MinLength } from 'class-validator';

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;

    // Utilizado para definir senhas mais fortes
    // @IsStrongPassword({
    //     minLength: 6,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    // })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    @IsNotEmpty()
    readonly passwordHash!: string;
}