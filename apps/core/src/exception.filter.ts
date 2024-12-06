import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    let errors
    switch (status) {
      case 400 :
        if (Array.isArray(exception.getResponse()['message'])) {
          errors = exception.getResponse()['message'].map((item )=> {
            if (item.split(".").length>1) return JSON.parse(item.split(".")[1]); else return JSON.parse(item)
          })
        } else {
          errors =exception.getResponse()['message']
        }
        break;
      case  403 :
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