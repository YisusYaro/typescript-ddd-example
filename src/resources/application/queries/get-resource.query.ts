import { Query } from '../../../shared/application/query';

class Properties {
  readonly id: string;
}

export class GetResourceQuery extends Properties implements Query {
  constructor(properties: Properties) {
    super();
    Object.assign(this, properties);
  }
}
