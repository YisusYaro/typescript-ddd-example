import * as express from 'express';
import {
  controller,
  httpGet,
  interfaces,
  response,
} from 'inversify-express-utils';

@controller('')
export class AppController implements interfaces.Controller {
  @httpGet('')
  async getServerStatus(@response() res: express.Response) {
    res.status(200).send('Server is working. ✨🎮');
  }
}
