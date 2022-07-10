const DOMAIN = {
  ResourceFactory: Symbol.for('ResourceFactory'),
};

const COMMAND_HANDLERS = {
  CreateResourceHandler: Symbol.for('CreateResourceHandler'),
};

const QUERY_HANDLERS = {
  GetResourceHandler: Symbol.for('GetResourceHandler'),
};

const EVENT_HANDLERS = {
  ResourceCreatedHandler: Symbol.for('ResourceCreatedHandler'),
};

const APPLICATION = {
  ...COMMAND_HANDLERS,
  ...QUERY_HANDLERS,
  ...EVENT_HANDLERS,
};

const INFRASTRUCTURE = {
  ResourceRepository: Symbol.for('ResourceRepository'),
};

export const TYPES = {
  ...DOMAIN,
  ...APPLICATION,
  ...INFRASTRUCTURE,
};
