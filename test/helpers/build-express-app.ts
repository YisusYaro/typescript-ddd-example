import {
  setConfigExpress,
  setErrorConfigExpress,
} from '../../src/express.config';
import { InversifyExpressServer } from 'inversify-express-utils';

export const buildExpressApp = (server: InversifyExpressServer) => {
  server.setConfig((app) => {
    setConfigExpress(app);
  });

  server.setErrorConfig((app) => {
    setErrorConfigExpress(app);
  });

  return server.build();
};
