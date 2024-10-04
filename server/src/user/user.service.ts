import { PrismaService } from "../prisma/prisma.service";
import { EditUserDTO } from "./DTO/user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { };

    async editUser(userId: string, dto: EditUserDTO) {

        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        });

        return user;

    };

};