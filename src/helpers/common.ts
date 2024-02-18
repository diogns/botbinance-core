import { InternalServerErrorException, Logger } from '@nestjs/common';
import { HANDLED_EXCEPTION_TYPES } from './constants';

const logger = new Logger('Common');

export const handleError = (error: unknown): void => {
  if (
    HANDLED_EXCEPTION_TYPES.some(
      (exceptionType) => error instanceof exceptionType,
    )
  ) {
    throw error;
  }
  if (error instanceof Error) {
    logger.error(error.message, error.stack);
  } else {
    logger.error(`Unknown error: ${JSON.stringify(error)}`);
  }
  throw new InternalServerErrorException();
};
