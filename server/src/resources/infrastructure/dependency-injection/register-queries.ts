import { getQueryHandlersMap } from '../../../shared/infrastructure/dependency-injection/register-queries';
import { GetResourceQuery } from '../../application/queries/get-resource.query';
import { TYPES } from './types';

export const registerResourcesQueries = (): void => {
  const queryHandlersMap = getQueryHandlersMap();

  queryHandlersMap.set(GetResourceQuery, TYPES.GetResourceHandler);
};
