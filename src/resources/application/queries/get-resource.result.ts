import { Result } from '../../../shared/application/result';

export class GetResourceResult implements Result {
  constructor(properties: {
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }) {
    Object.assign(this, properties);
  }
}
