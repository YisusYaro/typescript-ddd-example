import { Result } from '../../../shared/application/result';

export class GetResourceResult implements Result {
  readonly name: string;
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor({
    name,
    status,
    createdAt,
    updatedAt,
  }: {
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
