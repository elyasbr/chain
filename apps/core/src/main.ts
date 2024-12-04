import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionFilter } from './exception.filter';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  const configService = app.get(ConfigService);
  const port = configService.get<String>('MONGODB_URI');
  console.log(process.env.NODE_ENV)
  console.log(process.env.s1)
  console.log(process.env.ssss)

  console.log(port)
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }))
  app.useGlobalFilters(new ExceptionFilter())
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  const options = new DocumentBuilder()
    .setTitle('Chain')
    .setVersion('1.0')
    .addServer('http://localhost:7000/', 'Local environment')
    .addTag('Your API Tag')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      }
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen( 7000);
  console.info("http://localhost:7000/api-docs")
}
bootstrap();
