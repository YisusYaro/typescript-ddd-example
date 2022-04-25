import { Container } from 'inversify';
import { Logger } from '../../domain/logger';
import { CommandBus, CommandBusImpl } from '../command-bus/command-bus';
import {
  CommandHandlersInformation,
  CommandHandlersInformationImpl,
} from '../command-bus/command-handlers-information';
import { EventBus, EventBusImpl } from '../event-bus/event-bus';
import {
  EventHandlersInformation,
  EventHandlersInformationImpl,
} from '../event-bus/event-handlers-information';
import { WinstonLogger } from '../logger/winston-logger';
import { QueryBus, QueryBusImpl } from '../query-bus/query-bus';
import {
  QueryHandlersInformation,
  QueryHandlersInformationImpl,
} from '../query-bus/query-handlers-information';
import { TYPES } from './types';

const setInfraestructure = (container: Container): void => {
  container.bind<CommandBus>(TYPES.CommandBus).to(CommandBusImpl);

  container.bind<QueryBus>(TYPES.QueryBus).to(QueryBusImpl);

  container.bind<EventBus>(TYPES.EventBus).to(EventBusImpl);

  container
    .bind<CommandHandlersInformation>(TYPES.CommandHandlersInformation)
    .to(CommandHandlersInformationImpl)
    .inSingletonScope();

  container
    .bind<QueryHandlersInformation>(TYPES.QueryHandlersInformation)
    .to(QueryHandlersInformationImpl)
    .inSingletonScope();

  container
    .bind<EventHandlersInformation>(TYPES.EventHandlersInformation)
    .to(EventHandlersInformationImpl)
    .inSingletonScope();

  container.bind<Logger>(TYPES.Logger).to(WinstonLogger);
};

export function setSharedModule(container: Container): void {
  setInfraestructure(container);
}
