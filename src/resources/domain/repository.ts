import { Resource } from './resource';

export interface ResourceRepository {
  save(user: Resource): Promise<void>;
  findById(id: string): Promise<Resource | undefined>;
}
