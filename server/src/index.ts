import 'reflect-metadata';
import './app.controller';
import { AppContainer } from './shared/infraestructure/dependency-injection/app-container';
import { InversifyExpressServer } from 'inversify-express-utils';
import { setConfigExpress } from './express.config';
import { setErrorConfigExpress } from './express.config';
import './resources/interface/resources.controller';

const port = Number(process.env.PORT || 3000);

const container = AppContainer.getInstance().getContainer();

AppContainer.getInstance().setDependencyInjectionApp();

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  setConfigExpress(app);
});

server.setErrorConfig((app) => {
  setErrorConfigExpress(app);
});

const app = server.build();

app.listen(port, () => console.log(`Listening on ${port}.`));
