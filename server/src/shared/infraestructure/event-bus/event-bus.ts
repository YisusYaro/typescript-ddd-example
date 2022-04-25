import { inject, injectable } from 'inversify';
import { Event } from '../../domain/events/event';
import { EventHandlersInformation } from './event-handlers-information';
import { TYPES } from '../dependency-injection/types';

export interface EventBus {
  execute(event: Event): Promise<any>;
}

@injectable()
export class EventBusImpl implements EventBus {
  constructor(
    @inject(TYPES.EventHandlersInformation)
    private eventHandlersInformation: EventHandlersInformation,
  ) {}

  async execute(event: Event): Promise<any> {
    const handler = this.eventHandlersInformation.search(event);
    return await handler.handle(event);
  }
}
