import 'reflect-metadata';
import { Container } from 'inversify';
import {
  cleanUpMetadata,
  InversifyExpressServer,
} from 'inversify-express-utils';
import request from 'supertest';
import '../src/app.controller';
import { App } from '../src/shared/infrastructure/dependency-injection/app';
import { buildExpressApp } from './helpers/build-express-app';

describe('Health check', () => {
  let app: any;
  let container: Container;

  beforeAll(() => {
    container = App.getInstance().getContainer();
    const server = new InversifyExpressServer(container);
    app = buildExpressApp(server);
  });

  beforeEach(() => {
    container.snapshot();
    cleanUpMetadata();
  });

  afterEach(() => container.restore());

  describe('execute', () => {
    it('should return successful http status', async () => {
      await request(app).get('/').expect(200).expect('Server is working. ✨🎮');
    });
  });
});
