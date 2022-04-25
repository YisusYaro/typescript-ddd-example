import { inject, injectable } from "inversify";
import { NotFound } from "../../../shared/errors/not-found.error";
import { ErrorMessage } from "../../domain/errors/error";
import { ResourceRepository } from "../../domain/repository";
import { TYPES } from "../../infraestructure/dependency-injection/types";
import { GetResourceHandler } from "./get-resource.interface";
import { GetResourceQuery } from "./get-resource.query";
import { GetResourceResult } from "./get-resource.result";

@injectable()
export class GetResourceHandlerImpl implements GetResourceHandler {
  constructor(
    @inject(TYPES.ResourceRepository)
    private resourceRepository: ResourceRepository
  ) {}

  async handle(query: GetResourceQuery): Promise<GetResourceResult> {
    const resource = await this.resourceRepository.findById(
      query.id
    );

    if (!resource) throw new NotFound(ErrorMessage.RESOURCE_NOT_FOUND);

    const properties = resource.toProperties();

    const result = new GetResourceResult({
      ...properties,
    });

    return result;
  }
}
