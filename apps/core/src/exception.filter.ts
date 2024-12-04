import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    console.log(exception.getResponse()['message'])
    let errors
    switch (status) {
      case 400 :
         errors = exception.getResponse()['message'].map((item)=> {
          console.log(item)
          return JSON.parse(item)
        })
        break;
      case  403 :
        console.log(exception.getResponse())
        const message = exception.getResponse()['message']
        errors = JSON.parse(message)
        break
    }


    response
      .status(status)
      .json({
        status: "FAILURE",
        message : errors ,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}