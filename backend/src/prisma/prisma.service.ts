import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
            throw new Error('DATABASE_URL não foi definida no ambiente.');
        }

        const adapter = new PrismaBetterSqlite3({
            url: databaseUrl,
        });
        super({ adapter });
    }
}
