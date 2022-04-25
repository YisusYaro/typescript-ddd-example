import { EventHandler } from '../../../shared/domain/events/event.handler';
import { ResourceCreatedEvent } from '../../domain/events/resource-created.event';

export interface ResourceCreatedHandler
  extends EventHandler<ResourceCreatedEvent> {
  handle(event: ResourceCreatedEvent): Promise<void>;
}
