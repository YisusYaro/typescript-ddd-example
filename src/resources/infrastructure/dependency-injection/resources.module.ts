import { Container } from 'inversify';
import { CreateResourceHandlerImpl } from '../../application/commands/create-resource.handler';
import { CreateResourceHandler } from '../../application/commands/create-resource.interface';
import { GetResourceHandler } from '../../application/queries/get-resource.interface';
import { GetResourceHandlerImpl } from '../../application/queries/get-resource.handler';
import { ResourceFactory, ResourceFactoryImpl } from '../../domain/factory';
import { ResourceRepository } from '../../domain/repository';
import { ResourceRepositoryImpl } from '../repositories/resource.repository';
import { TYPES } from './types';
import { registerResourcesCommands } from './register-commands';
import { registerResourcesQueries } from './register-queries';

const setDomain = (container: Container): void => {
  container
    .bind<ResourceFactory>(TYPES.ResourceFactory)
    .to(ResourceFactoryImpl);
};

const setCommandsHandlers = (container: Container): void => {
  container
    .bind<CreateResourceHandler>(TYPES.CreateResourceHandler)
    .to(CreateResourceHandlerImpl);
};

const setQueryHandlers = (container: Container): void => {
  container
    .bind<GetResourceHandler>(TYPES.GetResourceHandler)
    .to(GetResourceHandlerImpl);
};

const setApplication = (container: Container): void => {
  setCommandsHandlers(container);
  registerResourcesCommands();
  setQueryHandlers(container);
  registerResourcesQueries();
};

const setInfrastructure = (container: Container): void => {
  container
    .bind<ResourceRepository>(TYPES.ResourceRepository)
    .to(ResourceRepositoryImpl);
};

export const setResourcesModule = (container: Container): void => {
  setDomain(container);
  setApplication(container);
  setInfrastructure(container);
};
