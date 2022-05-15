import { injectable, Container } from 'inversify';
import { Command } from '../../application/command';
import { CommandHandler } from '../../application/commands/command.handler';
import { AppContainer } from '../dependency-injection/app-container';
import { registerResourcesCommands } from '../../../resources/infrastructure/dependency-injection/register-commands';

export interface CommandHandlersInformation {
  search(command: Command): CommandHandler<Command>;
}

@injectable()
export class CommandHandlersInformationImpl
  implements CommandHandlersInformation
{
  private commandHandlersMap: Map<Command, symbol>;
  private container: Container;

  constructor() {
    this.container = AppContainer.getInstance().getContainer();
    this.commandHandlersMap = new Map();
    registerResourcesCommands(this.commandHandlersMap);
  }

  public search(command: Command): CommandHandler<Command> {
    const handler = this.commandHandlersMap.get(command.constructor);
    if (!handler) throw new Error('Command not registered');
    const commandHandler = this.container.get<CommandHandler<Command>>(handler);
    return commandHandler;
  }
}
