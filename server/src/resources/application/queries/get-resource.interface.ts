import { QueryHandler } from '../../../shared/application/queries/query.handler';
import { GetResourceQuery } from './get-resource.query';
import { GetResourceResult } from './get-resource.result';

export interface GetResourceHandler
  extends QueryHandler<GetResourceQuery, GetResourceResult> {
  handle(query: GetResourceQuery): Promise<GetResourceResult>;
}
