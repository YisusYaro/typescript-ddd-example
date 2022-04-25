import { Event } from '../domain/events/event';

export interface Logger {
  debug(message: string): void;
  error(message: string | Error, traceId?: string): void;
  info(message: string): void;
  event(event: Event): void;
}
