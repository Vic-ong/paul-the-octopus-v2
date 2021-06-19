import { UserAttributes } from '@/composables/types';

const dotProduct = (a: UserAttributes, b: UserAttributes, keys: string[]) => {
  let result = 0;
  keys.forEach((key) => {
    result += a[key] * b[key];
  });
  return result;
};

const vectorMagnitude = (v: UserAttributes, keys: string[]): number => {
  let result = 0;
  keys.forEach((key) => {
    result += Math.pow(v[key], 2);
  });
  return Math.sqrt(result);
};

/**
 * Calculates the consine similarity between 2 vectors
 * @param a
 * @param b
 * @returns result [0 to 1], 1 being the highest similarity
 */
export const cosineSimilarity = (a: UserAttributes, b: UserAttributes, keys: string[]): number => {
  const dotResult = dotProduct(a, b, keys);
  const magnitudeResult = vectorMagnitude(a, keys) * vectorMagnitude(b, keys);
  return magnitudeResult === 0 ? 0 : dotResult / magnitudeResult;
};
