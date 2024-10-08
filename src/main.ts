import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:3000"
    ],
    methods: "GET,HEAD,PUT,POST,DELETE",
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api");

  await app.listen(8080);

};

bootstrap();