import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                Task: true
            },
        });

        if (!user) {
            throw new HttpException(
                'Usuário não encontrado!',
                HttpStatus.NOT_FOUND,
            );
        }

        return user;
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,

                    // Nessa parte, o campo passwordHash é utilizado para armazenar a senha do usuário de forma segura,
                    // utilizando hash. Isso é importante para proteger a senha do usuário e evitar que ela seja armazenada
                    // em texto simples no banco de dados.
                    passwordHash: createUserDto.passwordHash,
                },
                // Nessa parte eu devolvo apenas os campos que eu quero que sejam retornados,
                // nesse caso, o ID, o nome e o email do usuário.
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            return user;
        } catch (error) {
            throw new HttpException(
                'Usuário não cadastrado!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id,
                },
            });

            if (!user) throw new NotFoundException('Este usuário não existe!');

            const updatedUser = await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    name: updateUserDto.name ? updateUserDto.name : user.name,
                    passwordHash: updateUserDto.passwordHash
                        ? updateUserDto.passwordHash
                        : user.passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            return updatedUser;
        } catch (error) {
            throw new HttpException(
                'Erro ao atualizar usuário!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async delete(id: number) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id,
                },
            });

            if (!user) throw new NotFoundException('Este usuário não existe!');

            await this.prisma.user.delete({
                where: {
                    id: user.id,
                },
            });

            return {
                message: 'Usuário deletado com sucesso!',
            }
        } catch (error) {
            throw new HttpException(
                'Erro ao deletar usuário!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
