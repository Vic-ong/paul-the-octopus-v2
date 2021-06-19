import { UserAttributes } from '@/composables/types';

const P_VALUE = 1.5;

/**
 * Calculates the l^p space between 2 vectors
 * @param a 
 * @param b
 * @returns result [>=0], shortest distance being the highest similarity
 */
 export const lpSpace = (a: UserAttributes, b: UserAttributes, keys: string[]): number => {
  let result = 0;
  keys.forEach((key) => {
    result += Math.pow(Math.abs(a[key] - b[key]), P_VALUE);
  });
  return Math.pow(result, 1 / P_VALUE);
};
