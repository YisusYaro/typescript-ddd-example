import { inject, injectable } from 'inversify';
import { DynamoRepository } from '../../../shared/infraestructure/repositories/dynamo.repository';
import { ResourceFactory } from '../../domain/factory';
import { ResourceRepository } from '../../domain/repository';
import { Resource, ResourceProperties } from '../../domain/resource';
import { TYPES } from '../dependency-injection/types';

@injectable()
export class ResourceRepositoryImpl
  extends DynamoRepository
  implements ResourceRepository
{
  @inject(TYPES.ResourceFactory) private resourceFactory: ResourceFactory;
  private tableName: string;

  constructor() {
    super();
    this.tableName =
      `${process.env.STACK_ENV}-${process.env.STACK_NAME}-resources-table` || '';
  }

  async save(resource: Resource): Promise<void> {
    const properties: ResourceProperties = resource.toProperties();
    const params = {
      TableName: this.tableName,
      Item: {
        id: properties.id,
        name: properties.name,
        status: properties.status,
        createdAt: properties.createdAt.toString(),
        updatedAt: properties.updatedAt.toString(),
      },
    };
    
    await this.put(params);
    return;
  }

  async findById(id: string): Promise<Resource | undefined> {
    const params = {
      Key: {
        id,
      },
      TableName: this.tableName,
    };

    const result = await this.get(params);

    if (!result.Item) return undefined;

    const resource = this.itemToResource(result.Item);

    return resource;
  }

  private itemToResource(
    result:
      | {
          [key: string]: any;
        }
      | undefined,
  ): Resource {
    const dataToReconstitute: any = {
      id: result?.id,
      name: result?.name,
      status: result?.status,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    };

    Object.keys(dataToReconstitute).forEach((key) =>
      dataToReconstitute[key] === undefined
        ? delete dataToReconstitute[key]
        : {},
    );

    return this.resourceFactory.reconstitute(dataToReconstitute);
  }
}
