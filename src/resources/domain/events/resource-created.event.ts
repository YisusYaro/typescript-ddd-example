import { Event } from '../../../shared/domain/events/event';

type Properties = {
  resource: {
    id: string;
    name: string;
    status: string;
  };
};

export class ResourceCreatedEvent extends Event {
  static readonly EVENT_NAME = 'resourceCreated';
  readonly resource: {
    id: string;
    name: string;
    status: string;
  };

  constructor(properties: Properties) {
    super(ResourceCreatedEvent.EVENT_NAME, properties.resource.id);
    Object.assign(this, properties);
  }

  toProperties() {
    const { resource } = this;
    return { resource };
  }
}
