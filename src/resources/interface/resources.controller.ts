import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost, interfaces, request,
  requestParam,
  response
} from 'inversify-express-utils';
import { CommandBus } from '../../shared/infrastructure/command-bus/command-bus';
import { TYPES as SHARED_TYPES } from '../../shared/infrastructure/dependency-injection/types';
import { QueryBus } from '../../shared/infrastructure/query-bus/query-bus';
import { CreateResourceCommand } from '../application/commands/create-resource.command';
import { GetResourceQuery } from '../application/queries/get-resource.query';

@controller('/resources')
export class FooController implements interfaces.Controller {
  constructor(
    @inject(SHARED_TYPES.CommandBus)
    private commandBus: CommandBus,
    @inject(SHARED_TYPES.QueryBus)
    private queryBus: QueryBus
  ) {}

  @httpPost('/')
  async createResource(
    @requestParam('id') id: string,
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const command = new CreateResourceCommand({
      id,
      ...req.body,
    });
    await this.commandBus.execute(command);
    res.sendStatus(204);
  }

  @httpGet('/:id')
  async listResources(
    @requestParam('id') id: string,
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const query = new GetResourceQuery({
      id,
    });
    const result = await this.queryBus.execute(query);
    res.status(200).send(result);
  }
}
