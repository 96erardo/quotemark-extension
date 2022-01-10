export type Result<T, E = Error> = Promise<[T | null, E | null]>;

export enum ErrorCodes {
  ServerException,
  Authentication,
  NonActive,
  NonAdmin,
}

export class ServerError extends Error {
  code: ErrorCodes = ErrorCodes.ServerException;

  constructor (message: string) {
    super(message);

    this.name = 'ServerError';
  }
}

export type TypographyNames =
  'Arial' |
  'Poppins' |
  'Barlow';
