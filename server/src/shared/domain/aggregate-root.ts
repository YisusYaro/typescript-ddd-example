import { Event } from './events/event';
import { AppContainer } from '../infrastructure/dependency-injection/app-container';
import { EventBus } from '../infrastructure/event-bus/event-bus';
import { TYPES as SHARED_TYPES } from '../infrastructure/dependency-injection/types';

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
