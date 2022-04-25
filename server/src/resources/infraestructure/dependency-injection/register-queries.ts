import { Query } from '../../../shared/application/query';
import { GetResourceQuery } from '../../application/queries/get-resource.query';
import { TYPES } from './types';

export const registerResourcesQueries = (
  queriesHandlersMap: Map<Query, symbol>
): void => {
  queriesHandlersMap.set(GetResourceQuery, TYPES.GetResourceHandler);
};
