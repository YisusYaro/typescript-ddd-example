import cors from 'cors';
import * as express from 'express';
import fileUpload from 'express-fileupload';
import { queryParser } from 'express-query-parser';
import { Logger } from './shared/domain/logger';
import { BadRequest } from './shared/errors/bad-request.error';
import { Forbidden } from './shared/errors/forbidden.error';
import { NotFound } from './shared/errors/not-found.error';
import { Unauthorized } from './shared/errors/unauthorized.error';
import { AppContainer } from './shared/infraestructure/dependency-injection/app-container';
import { TYPES } from './shared/infraestructure/dependency-injection/types';
import { ulid } from 'ulid';

export const setConfigExpress = (app: express.Application) => {
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json());
  app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true,
    }),
  );
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    }),
  );
  app.use(fileUpload());
};

export const setErrorConfigExpress = (app: express.Application) => {
  app.use(
    (
      error: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (error instanceof BadRequest) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof Unauthorized) {
        res.status(401).json({ error: error.message });
      } else if (error instanceof Forbidden) {
        res.status(403).json({ error: error.message });
      } else if (error instanceof NotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof Error) {
        const traceId = ulid();
        AppContainer.getInstance()
          .getContainer()
          .get<Logger>(TYPES.Logger)
          .error(error, traceId);
        const errorResult = {
          error: error.message,
          stack: error.stack,
          traceId,
        };
        if (!(process.env.STACK_ENV === 'test'))
          Object.assign(errorResult, { stack: error.stack });
        res.status(500).json(errorResult);
      }
      next();
    },
  );
};
