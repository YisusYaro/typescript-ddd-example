const INFRASTRUCTURE = {
  CommandBus: Symbol.for('CommandBus'),
  QueryBus: Symbol.for('QueryBus'),
  EventBus: Symbol.for('EventBus'),
  SqsEventBus: Symbol.for('SqsEventBus'),
  CommandHandlersInformation: Symbol.for('CommandHandlersInformation'),
  QueryHandlersInformation: Symbol.for('QueryHandlersInformation'),
  EventHandlersInformation: Symbol.for('EventHandlersInformation'),
  Logger: Symbol.for('Logger'),
};

export const TYPES = {
  ...INFRASTRUCTURE,
};
