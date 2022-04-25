import { Event } from './events/event';
import { AppContainer } from '../infraestructure/dependency-injection/app-container';
import { EventBus } from '../infraestructure/event-bus/event-bus';
import { TYPES as SHARED_TYPES } from '../infraestructure/dependency-injection/types';

export abstract class AggregateRoot {
  protected eventBus: EventBus;
  protected events: Event[] = [];

  constructor() {
    this.eventBus = AppContainer.getInstance()
      .getContainer()
      .get<EventBus>(SHARED_TYPES.EventBus);
  }

  record(event: Event): void {
    this.events.push(event);
  }

  async commit() {
    await Promise.all(
      this.events.map(async (event) => {
        await this.eventBus.execute(event);
      }),
    );
    this.events = [];
  }

  abstract toProperties(): any;
}
