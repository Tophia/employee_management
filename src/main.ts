/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { ValidateInputPipe } from './core/pipes/validate.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Auto-validation
  app.useGlobalPipes(new ValidationPipe());
  // custom made decorator roleguards
  // app.useGlobalGuards(new RolesGuard());
  const config = new DocumentBuilder()
  .setTitle('Employee Management')
  .setDescription('Employee Management API')
  .setVersion('1.0')
  // .addTag('employees')
  .addBearerAuth(
    { in: 'header', type: 'http' }
  //   {
  //   type: 'http',
  //   scheme: 'bearer',
  //   bearerFormat: 'JWT',
  //   name: 'JWT',
  //   description: 'Enter JWT token',
  //   in: 'header',
  // },
  // 'JWT-auth', 
    // { 
    //   name: 'Authorization',
    //   bearerFormat: 'JWT', 
    //   scheme: 'Bearer',
    //   type: 'http',
    //   in: 'Header'
    // },
    // 'access-token',

  )
  .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Employee Management API Docs'
}
const options: SwaggerDocumentOptions = {
  deepScanRoutes: true
};
const document = SwaggerModule.createDocument(app, config, options);
SwaggerModule.setup('api', app, document, customOptions);

// doc refered
// const options = new DocumentBuilder().addBearerAuth(
//   // {
//   //   type: 'http',
//   //   description: 'Employee Management API',
//   //   name: 'Employee',
//   //   in: 'Header',
//   //   scheme: 'Bearer',
//   //   bearerFormat: 'JWT',
//   //   // flows: 'OAuthFlowsObject',
//   //   openIdConnectUrl: 'localhost:8080/api',
//   // },
//   // 'JWT-auth'
// );
// const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);
  // handle all user input validation globally
  // app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(8080);
}
bootstrap();
