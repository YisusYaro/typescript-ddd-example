import { AggregateRoot } from '../../shared/domain/aggregate-root';
import { ResourceCreatedEvent } from './events/resource-created.event';

export type ResourceEssentialProperties = Required<{
  readonly id: string;
  readonly name: string;
}>;

export type ResourceOptionalProperties = Partial<{
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}>;

export type ResourceProperties = ResourceEssentialProperties &
  Required<ResourceOptionalProperties>;

export interface Resource {
  toProperties(): ResourceProperties;
  handleCreation(): Promise<void>;
  commit(): Promise<void>;
}

export class ResourceImplement extends AggregateRoot implements Resource {
  private readonly id: string;
  private name: string;
  private status = 'status';
  private readonly createdAt: string = new Date().toISOString();
  private updatedAt: string = new Date().toISOString();

  constructor(
    properties: ResourceEssentialProperties & ResourceOptionalProperties,
  ) {
    super();
    Object.assign(this, properties);
  }

  toProperties(): ResourceProperties {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async handleCreation() {
    const event = new ResourceCreatedEvent({
      resource: { id: this.id, name: this.name, status: this.status },
    });

    this.record(event);

    this.setAsUpdated();
  }

  private setAsUpdated() {
    this.updatedAt = new Date().toISOString();
  }
}
