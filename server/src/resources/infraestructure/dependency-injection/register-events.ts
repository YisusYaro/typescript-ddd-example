import { ResourceCreatedEvent } from '../../domain/events/resource-created.event';
import { TYPES } from './types';

export const registerResourcesEvents = (
  eventsHandlersMap: Map<string, symbol>
): void => {
  eventsHandlersMap.set(
    ResourceCreatedEvent.EVENT_NAME,
    TYPES.ResourceCreatedHandler
  );
};
