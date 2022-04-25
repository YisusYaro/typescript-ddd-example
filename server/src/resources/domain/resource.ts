import { AggregateRoot } from '../../shared/domain/aggregate-root';
import { ResourceCreatedEvent } from './events/resource-created.event';

export type ResourceEssentialProperties = Required<{
  readonly id: string;
  readonly name: string;
}>;

export type ResourceOptionalProperties = Partial<{
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
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
  private status: string = 'status';
  private readonly createdAt: Date = new Date();
  private updatedAt: Date = new Date();

  constructor(
    properties: ResourceEssentialProperties & ResourceOptionalProperties
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
    this.updatedAt = new Date();
  }
}
