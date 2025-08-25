<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());
  
  // Enable CORS if needed
  app.enableCors();
  
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
=======
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
>>>>>>> upstream/main
}
bootstrap();