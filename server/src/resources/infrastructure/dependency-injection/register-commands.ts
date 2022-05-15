import { Command } from '../../../shared/application/command';
import { CreateResourceCommand } from '../../application/commands/create-resource.command';
import { TYPES } from './types';

export const registerResourcesCommands = (
  commandHandlersMap: Map<Command, symbol>,
): void => {
  commandHandlersMap.set(CreateResourceCommand, TYPES.CreateResourceHandler);
};
