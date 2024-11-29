import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import {CommonModule} from '@app/common/common.module'
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
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
  await app.listen(process.env.port ?? 7000);
  console.info("http://localhost:7000/api-docs")
}
bootstrap();
