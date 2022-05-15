import { Container, injectable } from 'inversify';
import { EventHandler } from '../../domain/events/event.handler';
import { AppContainer } from '../dependency-injection/app-container';
import { Event } from '../../domain/events/event';
import { registerResourcesEvents } from '../../../resources/infrastructure/dependency-injection/register-events';

export interface EventHandlersInformation {
  search(event: Event): EventHandler<Event>;
}

@injectable()
export class EventHandlersInformationImpl implements EventHandlersInformation {
  private container: Container;
  private eventsHandlersMap: Map<string, symbol>;

  constructor() {
    this.container = AppContainer.getInstance().getContainer();
    this.eventsHandlersMap = new Map();
    registerResourcesEvents(this.eventsHandlersMap);
  }

  public search(event: Event): EventHandler<Event> {
    const type = this.eventsHandlersMap.get(event.eventName);
    if (!type) throw new Error('Event not registered');
    const eventHandler = this.container.get<EventHandler<Event>>(type);
    return eventHandler;
  }
}
