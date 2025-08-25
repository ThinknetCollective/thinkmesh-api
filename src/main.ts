import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
const app = await NestFactory.create(AppModule);


app.useGlobalPipes(
new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })
);


app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


await app.listen(3000);
}
bootstrap();