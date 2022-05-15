import { Container, injectable } from 'inversify';
import { QueryHandler } from '../../application/queries/query.handler';
import { AppContainer } from '../dependency-injection/app-container';
import { Query } from '../../application/query';
import { Result } from '../../application/result';
import { registerResourcesQueries } from '../../../resources/infrastructure/dependency-injection/register-queries';

export interface QueryHandlersInformation {
  search(query: Query): QueryHandler<Query, Result>;
}

@injectable()
export class QueryHandlersInformationImpl implements QueryHandlersInformation {
  private container: Container;
  private queriesHandlersMap: Map<Query, symbol>;

  constructor() {
    this.container = AppContainer.getInstance().getContainer();
    this.queriesHandlersMap = new Map();
    registerResourcesQueries(this.queriesHandlersMap);
  }

  public search(query: Query): QueryHandler<Query, Result> {
    const handler = this.queriesHandlersMap.get(query.constructor);
    if (!handler) throw new Error('Query not registered');
    const queryHandler =
      this.container.get<QueryHandler<Query, Result>>(handler);
    return queryHandler;
  }
}
