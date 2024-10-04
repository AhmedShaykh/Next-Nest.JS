import { PrismaService } from "../prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService
    ]
})
export class UserModule { };