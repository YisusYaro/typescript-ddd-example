import { inject, injectable } from 'inversify';
import { Logger } from '../../../shared/domain/logger';
import { TYPES as SHARED_TYPES } from '../../../shared/infraestructure/dependency-injection/types';
import { ResourceCreatedEvent } from '../../domain/events/resource-created.event';
import { ResourceCreatedHandler } from './resource-created.interface';

@injectable()
export class ResourceCreatedHandlerImpl implements ResourceCreatedHandler {
  constructor(
    @inject(SHARED_TYPES.Logger) private logger: Logger,
  ) {}

  async handle(event: ResourceCreatedEvent): Promise<void> {
    this.logger.event(event);
  }
}
