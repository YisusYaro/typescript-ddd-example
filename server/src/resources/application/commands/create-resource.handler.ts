import { inject, injectable } from 'inversify';
import { CreateResourceHandler } from './create-resource.interface';
import { ResourceRepository } from '../../domain/repository';
import { CreateResourceCommand } from './create-resource.command';
import { ResourceFactory } from '../../domain/factory';
import { TYPES } from '../../infraestructure/dependency-injection/types';

@injectable()
export class CreateResourceHandlerImpl implements CreateResourceHandler {
  constructor(
    @inject(TYPES.ResourceRepository)
    private resourceRepository: ResourceRepository,
    @inject(TYPES.ResourceFactory)
    private resourceFactory: ResourceFactory,
  ) {}

  async handle(command: CreateResourceCommand): Promise<void> {
    const resource = this.resourceFactory.create({
      id: command.id,
      name: command.name,
    });

    await resource.handleCreation();

    await this.resourceRepository.save(resource);

    resource.commit();

    return;
  }
}
