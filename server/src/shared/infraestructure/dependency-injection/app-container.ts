import { Container } from 'inversify';

export class AppContainer {
  private static instance: AppContainer;
  private container: Container;

  private constructor() {
    this.container = new Container();
  }

  public static getInstance(): AppContainer {
    if (!AppContainer.instance) {
      AppContainer.instance = new AppContainer();
    }

    return AppContainer.instance;
  }

  public getContainer(): Container {
    return this.container;
  }

  public setDependencyInjectionApp() {}
}
