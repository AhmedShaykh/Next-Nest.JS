import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {

    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    };

    async validate(payload: { sub: string, email: string }) {

        const user = await this.prisma.user.findFirst({
            where: {
                id: payload.sub
            }
        });

        if (!user) {

            throw new UnauthorizedException("Login First To Access This Endpoint...");

        }

        return user;

    };

};