/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GenericObject {
  [key: string]: any;
}

export const enum IMPORTANCE {
  LOG_POP = 1,
  LOG_POP_GM = 2,
  POP = 3,
}
