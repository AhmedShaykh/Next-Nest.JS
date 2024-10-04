import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { GetUser } from "../get-user.decorator";
import { JwtGuard } from "../auth/jwt.guard";
import { UserService } from "./user.service";
import { EditUserDTO } from "./DTO/user.dto";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {

    constructor(private userService: UserService) { };

    @Get("me")
    getUser(@GetUser() user: User) {
        return user;
    };

    @Put()
    editUser(@GetUser("id") userId: string, @Body() dto: EditUserDTO) {
        return this.userService.editUser(userId, dto);
    };

};