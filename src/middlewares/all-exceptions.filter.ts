import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GroupsController } from 'src/groups/groups.controller';
import { UsersController } from 'src/users/users.controller';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger();

  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const message = exception.message;
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({ message, statusCode });

    this.logException(request, response, message);
  }

  private logException(request: Request, response: Response, message: string): void {
    const errorSource = this.getMethodName(request);
    const { params, query, body } = request;

    console.error(response);
    console.error(request);

    this.logger.error(`Source: ${errorSource}`);
    this.logger.error(`Message: ${message}`);
    this.logger.error({ params, query, body });
  }

  private getMethodName(request: Request): string {
    const { method, params } = request;
    const [, , endpointName]: string[] = request.url.split('/');

    if (endpointName === 'users') {
      const controllerName = UsersController.name;
      switch (method) {
        case 'GET':
          if (params.id) return `${controllerName}.${UsersController.prototype.getUserById.name}`;
          return `${controllerName}.${UsersController.prototype.getAutoSuggestUsers.name}`;
        case 'POST':
          return `${controllerName}.${UsersController.prototype.createUser.name}`;
        case 'PUT':
          return `${controllerName}.${UsersController.prototype.updateUser.name}`;
        case 'DELETE':
          return `${controllerName}.${UsersController.prototype.deleteUser.name}`;
      }
    }

    if (endpointName === 'groups') {
      const controllerName = GroupsController.name;
      switch (method) {
        case 'GET':
          if (params.id) return `${controllerName}.${GroupsController.prototype.findOneGroup.name}`;
          return `${controllerName}.${GroupsController.prototype.findAllGroups.name}`;
        case 'POST':
          if (params.id)
            return `${controllerName}.${GroupsController.prototype.addUsersToGroup.name}`;
          return `${controllerName}.${GroupsController.prototype.createGroup.name}`;
        case 'PUT':
          return `${controllerName}.${GroupsController.prototype.updateGroup.name}`;
        case 'DELETE':
          return `${controllerName}.${GroupsController.prototype.removeGroup.name}`;
      }
    }
  }
}
