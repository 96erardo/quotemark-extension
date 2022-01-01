export type Result<T, E = Error> = Promise<[T | null, E | null]>;

export type TypographyNames =
  'Arial' |
  'Poppins' |
  'Barlow';