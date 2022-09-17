export type DateToString<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
